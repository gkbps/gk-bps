import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // FormArray,
import { AbstractControl, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
// import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
// import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';
// import { getApprovalItemsAction } from '../../../ngrx/approvalItem/approvalItems.actions'
import { getRequestApprovalAction } from '../../../ngrx/requestApproval/requestApproval.actions';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  TcodeService,
  // NavigationService,
  // ObjectService,
  // APIResultHandlingService,
  LocalStorageService,
} from '../../../nga/services';

import { UserService } from '../../../ngrx/user/user.service';

@Component({
  selector: 'request-header',
  templateUrl: './requestHeader.html',
  styleUrls: ['./requestHeader.scss'],
})
export class RequestHeader implements OnInit, OnDestroy, OnChanges {

  myScope = 'request-header';

  @Input() tcode: any;
  @Input() source: any;
  @Output() onSelectAction: EventEmitter<any> = new EventEmitter();

  items: MenuItem[];

  myForm: FormGroup;
  formEditable: boolean;

  user: any;
  debug = false;

  lblConfirm = 'Confirm';
  lblCancel = 'Cancel';

  approvalTypeList = [];
  requestApproval: any;

  filteredUsersSingle: any;

  constructor(
    // private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private securityService: SecurityService,
    // private navigationService: NavigationService,
    private tcodeService: TcodeService,
    // private objectService: ObjectService,
    // private apiResultHandlingService: APIResultHandlingService,
    private _fb: FormBuilder,

    private localStorage: LocalStorageService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private userService: UserService,

    private store: Store<any>
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorage.getLang());

    // Get user and preference, call it here to get early reponse
    this.user = this.securityService.getCurrentUser();
    this.debug = this.localStorage.getDebugMode();
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    this.requestApproval = this.store.pipe(select('requestApproval'));
    this.requestApproval.subscribe(res => {
      // console.log(res);
      if (!res.pending && !res.error) {
        this.approvalTypeList = Object.assign([], res.data);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // IMPORTANT: Form is initialize only after source has data
    if (changes['source']) {
        // console.log(this.source);
        this.initialize();
    }

    if (changes['tcode'] && this.tcode) {
      // Get requestApproval
      this.store.dispatch(getRequestApprovalAction(this.tcode));
    }

    if (changes['myForm.valid']) {
        console.log('Oh yeah');
    }
  }

  initialize() {
    this.formEditable = false;

    // console.log(this.source.data.status);
    switch (this.source.data.status) {
      case 'New':
        if (this.source.data.owner.includes(this.user.username)) {
          this.formEditable = true;
        }
        // console.log(this.source.data.owner, this.user.username)
        // console.log(this.source.data.owner.includes(this.user.username));
        break;

      case 'Draft':
        if (this.source.data.owner.includes(this.user.username)) {
          this.formEditable = true;
        }
        break;

      case 'P. Submit':
        // Consider this as it's quite odd for requestor return instead of edit himself to submit
        if (this.source.data.requestor.username === this.user.username) {
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

    // console.log(this.formEditable);

    // Build Form
    this.initForm();
  }

  initForm() {
    this.myForm = this._fb.group({
      _id: [ this.source.data._id ],
      tcode: [ this.source.data.tcode, [ Validators.required ]],
      desc: [ this.source.data.desc, [ Validators.required ]],
      remark: [ this.source.data.remark ],
      status: [ this.source.data.status, [ Validators.required ]],
      step: [ this.source.data.step ],
      approval_type: [ this.source.data.approval_type], // [Validators.required ]
      requestor: [ this.source.data.requestor, [ Validators.required ]],
      owner: [ this.source.data.owner, [ Validators.required ]],
      approved: [ this.source.data.approved ],
      pic: [ this.source.data.pic ],
      planned: [ this.source.data.planned ],
      next: [ this.source.data.next ]
    });

    this.initNav();
  }

  initNav() {
    this.translateService.get([
      'create', 'new', 'save', 'return', 'submit',
      'withdraw', 'cancel', 'reject', 'approve',
      'abort', 'post', 'revert', 'copy', 'print'
    ])
      .subscribe((res) => {
        this.items = [];
        if (this.source.data.status !== 'New') {
          this.items.push({ label: res.create, icon: 'ui-icon-add',
            command: (event) => {
              // TODO: TO check if could access gkcln31 or relied on Guard or disable if no priviledge
              this.tcodeService.executeTcode(this.tcode);
            }
          });
          this.items.push({ label: res.copy, icon: 'ui-icon-content-copy', command: (event) => this.confirmAction('copy') });
          this.items.push({ label: res.print, icon: 'ui-icon-print', command: (event) => this.confirmAction('print') });
        }

        switch (this.source.data.status) {
          case 'New':
            this.items.push({ label: res.save, icon: 'ui-icon-save', command: (event) => this.confirmAction('save') });
            break;

          case 'Draft':
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({ label: res.save, icon: 'ui-icon-save', command: (event) => this.confirmAction('save') } );
              this.items.push({ label: res.submit, icon: 'ui-icon-send', command: (event) => this.confirmAction('submit') });
            }
            break;

          case 'P. Submit':
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'In progress':
            console.log(this.user.username, this.source.data.owner, this.source.data.pic);
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({
                label: res.withdraw,
                icon: 'ui-icon-subdirectory-arrow-left',
                command: (event) => this.confirmAction('withdraw')
              });
              this.items.push({ label: res.cancel, icon: 'ui-icon-no-sim', command: (event) => this.confirmAction('cancel') });
            }

            if (this.source.data.pic.username === this.user.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.reject, icon: 'ui-icon-thumb-down', command: (event) => this.confirmAction('reject') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }

            break;

          case 'P. Withdraw':
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'P. Cancel':
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({ label: res.return, icon: 'ui-icon-reply', command: (event) => this.confirmAction('return') });
              this.items.push({ label: res.approve, icon: 'ui-icon-thumb-up', command: (event) => this.confirmAction('approve') });
            }
            break;

          case 'Cancelled':
            break;

          case 'Rejected':
            break;

          case 'Approved':
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({ label: res.abort, icon: 'ui-icon-pan-tool', command: (event) => this.confirmAction('abort') });
            }
            // this.items.push({ label: res.post, icon: 'ui-icon-done', command: (event) => this.confirmAction('19') });
            break;

          case 'P. Abort':
            if (this.source.data['requestor'].username === this.user.username) {
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
  }

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
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    // this.requestApproval.unsubscribe();
  }

  /**
  * FORM CONTROL RELATED OPERATION
  */

  /**
  * STATUS LABEL COLOR
  * @function getStatusDefault
  * @function getStatusWarning
  * @function getStatusInfo
  * @function getStatusDanger
  * @function getStatusSuccess
  */

  getStatusDefault(value) { return ['New', 'Draft', 'P. Submit'].includes(value); }

  getStatusWarning(value) { return ['P. Withdraw', 'P. Cancel', 'P. Abort'].includes(value); }

  getStatusInfo(value) { return ['In progress'].includes(value); }

  getStatusDanger(value) { return ['Cancelled', 'Rejected', 'Aborted'].includes(value); }

  getStatusSuccess(value) { return ['Approved', 'Posted'].includes(value); }

  /**
  * AUTO COMPLETE - USER
  * @function filterUserSingle
  * @function filterUser
  */
  filterUserSingle(event) {
    const query = event.query;
    console.log(query);
    if (query.length > 1) {
      this.userService.findAPIListPagination(query, '{}', 0, 20)
        .subscribe(data => {
          console.log(data);
          this.filteredUsersSingle = data;
        });
    }
  }

  // filterUser(query, users: any[]):any[] {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered : any[] = [];
  //   for(let i = 0; i < users.length; i++) {
  //     let user = users[i];
  //     if (user.fullname.toLowerCase().includes(query.toLowerCase()))  {
  //         filtered.push(user);
  //     }
  //   }
  //   console.log(filtered);
  //   return filtered;
  // }

  /**
  * FORM VALIDITY
  */

  markAllDirty(control: AbstractControl) {
    if (control.hasOwnProperty('controls')) {
      control.markAsDirty({onlySelf: true}); // mark group
      const ctrl = <any>control;
      for (const inner in ctrl.controls) {
          this.markAllDirty(ctrl.controls[inner] as AbstractControl);
      }
    } else {
      (<FormControl>(control)).markAsDirty({onlySelf: true});
    }
  }

  /**
  * FORM ACTION
  */

  confirmAction(action: string) {
    this.translateService.get([
      'confirmation', 'wouldYouConfirm', 'cancel', 'confirm'
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

  executeAction(action: string): void {
    if (!this.myForm.valid) {
      this.markAllDirty(this.myForm);

      this.translateService.get(['invalid_form', 'invalid_form_message'])
        .subscribe((res) => {
          const toastData = {
            type: 'warning',
            title: res.invalid_form,
            msg: res.invalid_form_message,
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty', '', toastData);
        });
    } else {
      // console.log(this.myForm.controls['status'].value);
      // console.log(action);

      this.onSelectAction.emit({
        action: action,
        valid: this.myForm.valid,
        data: this.myForm.value
      });
    }
  }

}
