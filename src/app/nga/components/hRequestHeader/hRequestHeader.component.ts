import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AbstractControl, FormControl } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  TcodeService,
  NavigationService,
  ObjectService,
  APIResultHandlingService,
  LocalStorageService,
} from '../../../nga/services';
import { GkUser } from '../../../store/_models/gkUser.model';
import { GkUserService } from '../../../store/_services/gkUser.service';

import { GkRequest } from '../../../store/_models/gkRequest.model';
import { GkRequestService } from '../../../store/_services/gkRequest.service';

import { ApprovalItemService } from '../../../store/_services/approvalItem.service';

@Component({
  selector: 'h-request-header',
  templateUrl: './hRequestHeader.html',
  styleUrls: ['./hRequestHeader.scss'],
})
export class HRequestHeader implements OnInit, OnDestroy, OnChanges {

  myScope = 'h-request-header';

  @Input() tcode: any;

  @Output() getRequestHeaderChange: EventEmitter<any> = new EventEmitter();
  @Output() getAction: EventEmitter<any> = new EventEmitter();

  items: MenuItem[];

  requestHeader: any;

  id = '';
  status = 'New';
  formEditable = true;
  myForm: FormGroup;

  username = '';
  fullname = '';

  msgs: Message[] = [];
  debugMode = false;

  lblConfirm = 'Confirm';
  lblCancel = 'Cancel';

  approvalTypeList: any;

  // Redux based variables
  selectedGkRequest: Observable<GkRequest>;
  private subscription: Subscription;

  apiGkUsers: Observable<Array<GkUser>>;
  private gkUserSubscription: Subscription;
  filteredUsersSingle: any[];

  /****************************************************************************
   * INITIALIZATION
   * Constructor
   * ngOnInit
   * parseTCode
   * initBasicModelThenGetData
   * initBasicModel
   ****************************************************************************/
  constructor(
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private gkRequestService: GkRequestService,
    private gkUserService: GkUserService,
    private securityService: SecurityService,
    private navigationService: NavigationService,
    private tcodeService: TcodeService,
    private objectService: ObjectService,
    private apiResultHandlingService: APIResultHandlingService,
    private _fb: FormBuilder,

    private localStorage: LocalStorageService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private approvalItemService: ApprovalItemService
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorage.getLang());

    // Do not need to ask for unused User List - reduce loading
    // this.gkUserService.findAPIListPagination('', '{}', 0, 20);
  }

  ngOnInit() {
    // Local subscription to global state
    // console.log(this.tcode);
    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    // Get user and preference
    const user = this.securityService.getCurrentUser();
    this.username = user.username;
    this.fullname = user.lastName + ' ' + user.firstName;
    this.debugMode = this.localStorage.getDebugMode();

    this.initBlankModelAndForm();

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        // console.log('Id: ', this.id);
        this.id = params['id'];
        this.gkRequestService.findById(params['id']);
      } else {
        // Already reset Store at Request Level
        // this.gkRequestService.createBlankItem();
      }
    });

    this.initNav();

  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['myForm.valid']) {
          console.log('Oh yeah')
      }
  }

  /**
   * FUNCTION TO INITIALIZE BLANK MODEL (BASIC MODEL)
   */
  initBlankModelAndForm() {
    this.requestHeader = {
      _id:'',
      tcode: this.tcode,
      desc: '',
      remark: '',
      status: 'New',
      step: '',
      approval_type: {},
      requestor: {username: this.username, fullname: this.fullname },
      owner: [this.username],
      approved: [],
      pic: '',
      planned: '',
      next: [],
    };
    this.id = '';
    this.status = 'New';
    this.initForm();
  }

  /****************************************************************************
   * FORM CONSTRUCTION
   ****************************************************************************/

  /**
   * Function to initialize form with client data
   */
  initForm() {

    // Initialize formEditable
    this.formEditable = false;

    // console.log(this.status);

    switch (this.status) {
      case 'New':
        if (this.requestHeader.owner.includes(this.username)){
          this.formEditable = true;
        }
        break;

      case 'Draft':
        if (this.requestHeader.owner.includes(this.username)){
          this.formEditable = true;
        }
        break;

      case 'P. Submit':
        // Consider this as it's quite odd for requestor return instead of edit himself to submit
        if (this.requestHeader.requestor.username === this.username){
          this.formEditable = true;
        }
        break;

      case 'In progress':
        break;

      case 'P. Withdraw':
        break;

      case 'P. Cancel':
        break;

      case 'Cancelled':
        break;

      case 'Rejected':
        break;

      case 'Approved':
        break;

      case 'P. Abort':
        break;

      case 'Aborted':
        break;

      case 'Posted':
        break;

      default:
        break;
    }

    // Build Form
    this.buildForm();
  }

  private buildForm() {
    // console.log('Editable:', this.formEditable);

    this.myForm = this._fb.group({
      _id: [ this.requestHeader._id ],
      tcode: [ this.requestHeader.tcode, [ Validators.required ]],
      desc: [ this.requestHeader.desc, [ Validators.required ]],
      remark: [ this.requestHeader.remark ],
      status: [ this.requestHeader.status, [ Validators.required ]],
      step: [ this.requestHeader.step ],
      approval_type: [ this.requestHeader.approval_type, [ Validators.required ]],
      requestor: [ this.requestHeader.requestor, [ Validators.required ]],
      owner: [ this.requestHeader.owner, [ Validators.required ]],
      approved: [ this.requestHeader.approved ],
      pic: [ this.requestHeader.pic ],
      planned: [ this.requestHeader.planned ],
      next: [ this.requestHeader.next ]
    });

    this.initNav();


  }

  initNav() {
    this.translateService.get(['create', 'new', 'save', 'return', 'submit', 'withdraw', 'cancel', 'reject', 'approve', 'abort', 'post', 'revert', 'copy', 'print'])
      .subscribe((res) => {
        this.items = [];
        if (this.status!=='New') {
          this.items.push({ label: res.create, icon: 'ui-icon-add',
            command: (event) => {
              // TODO: TO check if could access gkcln31 or relied on Guard or disable if no priviledge
              this.tcodeService.executeTcode(this.tcode);
            }
          });
          this.items.push({ label: res.copy, icon: 'ui-icon-content-copy', command: (event) => this.confirmAction('copy') });
          this.items.push({ label: res.print, icon: 'ui-icon-print', command: (event) => this.confirmAction('print') });
        }

        switch (this.status) {
          case 'New':
            this.items.push({ label: res.save, icon: 'ui-icon-save', command: (event) => this.confirmAction('save') });
            break;

          case 'Draft':
            if (this.requestHeader.owner.includes(this.username)) {
              this.items.push({ label: res.save, icon: 'ui-icon-save', command: (event) => this.confirmAction('save') } );
              this.items.push({ label: res.submit, icon: 'ui-icon-send', command: (event) => this.confirmAction('submit') });
            }
            break;

          case 'P. Submit':
            if (this.requestHeader['requestor'].username === this.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'In progress':
            console.log(this.username, this.requestHeader.owner, this.requestHeader.pic);
            if (this.requestHeader.owner.includes(this.username)) {
              this.items.push({ label: res.withdraw, icon: 'ui-icon-subdirectory-arrow-left', command: (event) => this.confirmAction('withdraw') });
              this.items.push({ label: res.cancel, icon: 'ui-icon-no-sim', command: (event) => this.confirmAction('cancel') });
            }

            if (this.requestHeader.pic.username === this.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.reject, icon: 'ui-icon-thumb-down', command: (event) => this.confirmAction('reject') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }

            break;

          case 'P. Withdraw':
            if (this.requestHeader['requestor'].username === this.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'P. Cancel':
            if (this.requestHeader['requestor'].username === this.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'Cancelled':
            break;

          case 'Rejected':
            break;

          case 'Approved':
            if (this.requestHeader.owner.includes(this.username)) {
              this.items.push({ label: res.abort, icon: 'ui-icon-pan-tool', command: (event) => this.confirmAction('abort') });
            }
            // this.items.push({ label: res.post, icon: 'ui-icon-done', command: (event) => this.confirmAction('19') });
            break;

          case 'P. Abort':
            if (this.requestHeader['requestor'].username === this.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'Aborted':
            break;

          case 'Posted':
            this.items.push({ label: res.revert, icon: 'ui-icon-done', command: (event) => this.confirmAction('revert') });
            break;

          default:
            break;
        }
      });
      console.log(this.items);
  }

  confirmAction(action: string) {
    this.translateService.get([
      'confirmation',
      'wouldYouConfirm',
      'cancel',
      'confirm'
    ])
    .subscribe((res) => {
      this.lblConfirm = res.confirm;
      this.lblCancel = res.cancel;

      this.confirmationService.confirm({
        message: res.wouldYouConfirm,
        header: res.confirmation,
        icon: 'ui-icon-help',
        accept: () => {
          this.executeAction(action);
        },
        reject: () => {

        }
      });
    });
  }

  markAllDirty(control: AbstractControl) {
      if(control.hasOwnProperty('controls')) {
          control.markAsDirty({onlySelf: true}) // mark group
          let ctrl = <any>control;
          for (let inner in ctrl.controls) {
              this.markAllDirty(ctrl.controls[inner] as AbstractControl);
          }
      }
      else {
          (<FormControl>(control)).markAsDirty({onlySelf: true});
      }
  }

  executeAction(action: string): void {
    if (!this.myForm.valid) {
      // this.myForm.controls['desc'].updateValueAndValidity();
      // this.myForm.updateValueAndValidity();
      this.markAllDirty(this.myForm);

      this.translateService.get(['invalid_form', 'invalid_form_message'])
        .subscribe((res) => {
          const toastData = {
            type: 'warning',
            title: res.invalid_form,
            msg: res.invalid_form_message,
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty','', toastData);
        });
    } else {
      console.log(this.myForm.controls['status'].value);

      switch (action) {
        case 'save':
          if (this.myForm.controls['status'].value==='New'){
            this.saveRequestHeader();
          }
          // Else prioritize save requestBody first
          break;

        case 'submit':
          // Prioritize save requestBody first
          break;

        case 'withdraw':
          // IN PROGRESS -> P. WITHDRAW
          // IN PROGRESS -> DRAFT
          if (this.id) {
            this.gkRequestService.withdraw(this.myForm.value._id);
          }
          break;

        case 'cancel':
          // IN PROGRESS -> P. CANCEL
          // IN PROGRESS -> CANCELLED
          if (this.id) {
            this.gkRequestService.cancel(this.myForm.value._id);
          }
          break;

        case 'return':
          // P. SUBMIT -> DRAFT
          // IN PROGRESS -> DRAFT
          // P. WITHDRAW -> IN PROGRESS
          // P. CANCEL -> IN PROGRESS
          // P. ABORT -> APPROVED
          if (this.id) {
            this.gkRequestService.returnRequest(this.myForm.value._id);
          }
          break;

        case 'reject':
          // IN PROGRESS -> REJECTED
          if (this.id) {
            this.gkRequestService.reject(this.myForm.value._id);
          }
          break;

        case 'approve':
          // P. SUBMIT -> IN PROGRESS
          // IN PROGRESS -> APPROVED
          // P. WITHDRAW -> DRAFT
          // P. CANCEL -> CANCELLED
          // P. ABORT -> ABORTED
          if (this.id) {
            this.gkRequestService.approve(this.myForm.value._id);
          }
          break;

        case 'abort':
          // APPROVED -> P. ABORT
          this.gkRequestService.abort(this.myForm.value._id);
          break;

        case 'post':
          // APPROVED -> POSTED

          break;

        case 'revert':
          // POSTED -> APPROVED
          break;

        case 'copy':
          break;

        case 'print':
          break;

        default:
          break;
      }

      this.getAction.emit({
        action: action,
        valid: this.myForm.valid,
        value: this.myForm.value
      });

    }
  }

  saveRequestHeader() {
    // NEW -> DRAFT
    if (!this.id) {
      this.gkRequestService.createNew(this.myForm.value);
    }
    // DRAFT -> DRAFT
    else {
      // console.log(this.myForm.value);
      this.gkRequestService.update(this.myForm.value);
    }
  }

  submitRequestHeader() {
    // DRAFT -> P. SUBMIT
    // DRAFT -> IN PROGRESS
    if (this.id) {
      this.gkRequestService.submit(this.myForm.value);
    }
  }
  /****************************************************************************/
  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translateService.use(lang);
      this.initNav();
    });

    // Redux store
    this.gkRequestService.createBlankItem();
    this.selectedGkRequest = this.gkRequestService.selectedGkRequest;

    this.subscription = this.selectedGkRequest
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        if (this.id === '') {
          if (!responseBodyData['_id']) {
            // console.log('New Request');
            this.initBlankModelAndForm();
          } else {
            // console.log(responseBodyData['_id']);
            // console.log(this.tcode);
            this.tcodeService.executeTcode(this.tcode, responseBodyData['_id']);
          }
        } else {
          if (responseBodyData['_id'] === this.id) { // IMPORTANT: To prevent getting the last Observable item by default

            // TODO: To check if this.username is in the list of relevant user otherwise notify blank page
            // console.log('Existing Request');
            // this.id = responseBodyData['_id'] || '';
            this.requestHeader = responseBodyData || {};
            this.status = responseBodyData['status'] || 'New';
            this.initForm();
          }
        }

      }, error => {
        console.log(error);
      });

      this.apiGkUsers = this.gkUserService.apiGkUsers;
      this.gkUserSubscription = this.apiGkUsers
        .subscribe(responseBodyData => {
          // console.log(responseBodyData);
          this.filteredUsersSingle = responseBodyData['data'];
        }, error => {
          console.log(error);
        });

      this.approvalItemService.apiGetApprovalTypesListByTcode(this.tcode)
        .subscribe(responseBodyData => {
          // console.log(responseBodyData);
          this.approvalTypeList = responseBodyData['body'].data;
        }, error => {
          console.log(error);
        });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscription.unsubscribe();
    this.gkUserSubscription.unsubscribe();
    // this.myForm.valueChanges.unsubscribe();
  }

  /*****************************************************************************
   * FORM CONTROL RELATED OPERATION
   *
   ****************************************************************************/

  getStatusDefault(value) {
    return ['New', 'Draft', 'P. Submit'].includes(value);
  }

  getStatusWarning(value) {
    return ['P. Withdraw', 'P. Cancel', 'P. Abort'].includes(value);
  }

  getStatusInfo(value) {
    return ['In progress'].includes(value);
  }

  getStatusDanger(value) {
    return ['Cancelled', 'Rejected', 'Aborted'].includes(value);
  }

  getStatusSuccess(value) {
    return ['Approved', 'Posted'].includes(value);
  }

  filterUserSingle(event) {
    let query = event.query;
    console.log(query);
    if (query.length >1) {
      this.gkUserService.findAPIListPagination(query, '{}', 0, 20);
    }
  }

  filterUser(query, users: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.fullname.toLowerCase().includes(query.toLowerCase()))  {
          filtered.push(user);
      }
    }
    console.log(filtered);
    return filtered;
  }

}


//   this.myForm = this._fb.group({
//     _id: [ {value: this.requestHeader._id, disabled: true} ],
//     tcode: [ {value: this.requestHeader.tcode, disabled: true}, [ Validators.required ]],
//     desc: [ {value: this.requestHeader.desc, disabled: true}, [ Validators.required ]],
//     remark: [ {value: this.requestHeader.remark, disabled: true} ],
//     status: [ {value: this.requestHeader.status, disabled: true}, [ Validators.required ]],
//     step: [ {value: this.requestHeader.step, disabled: true} ],
//     requestor: [ {value: this.requestHeader.requestor, disabled: true}, [ Validators.required ]],
//     owner: [ {value: this.requestHeader.owner, disabled: true}, [ Validators.required ]],
//     approved: [ {value:this.requestHeader.approved, disabled: true} ],
//     pic: [ {value: this.requestHeader.pic, disabled: true} ],
//     planned: [ {value: this.requestHeader.planned, disabled: true} ],
//     next: [ {value: this.requestHeader.next, disabled: true} ]
//   });
// this.onChanges();

// onChanges() {
//   this.myForm.valueChanges.subscribe(val =>{
//     console.log(val);
//     this.getRequestHeaderChange.emit({
//       valid: this.myForm.valid,
//       value: val
//     });
//   })
// }
