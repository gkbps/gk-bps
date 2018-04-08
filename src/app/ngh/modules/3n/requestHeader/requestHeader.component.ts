import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // FormArray,
import { AbstractControl, FormControl } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { getRequestApprovalAction } from '../../../../ngrx/requestApproval/requestApproval.actions';

// For form control
import { UsersServices } from '../../../../ngrx/user/user.service';

import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services/localStorage.service';
import { SecurityService } from '../../../../nga/services/security.service';
import { TcodeService } from '../../../../nga/services/tcode.service';

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

  // Context menu
  items: MenuItem[];

  // Form group
  myForm: FormGroup;
  formEditable: boolean;

  // To check logged in user vs request stakeholders
  user: any;

  // Debug
  debug = false;

  // Confirm dialog
  lblConfirm = 'Confirm';
  lblCancel = 'Cancel';

  // Approval type
  approvalTypeList = [];
  requestApproval: any;
  filteredUsersSingle: any;

  constructor(
    private _fb: FormBuilder,

    private confirmationService: ConfirmationService,

    private translateService: TranslateService,

    private globalState: GlobalState,
    private localStorage: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private userService: UsersServices,

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
    // IMPORTANT: Can only get Input tcode from and after OnInit
    this.subscribeLocalState();

    this.requestApproval = this.store.pipe(select('requestApproval'));
    this.requestApproval.subscribe(res => {
      // console.log(res);
      if (!res.pending && !res.error) {
        this.approvalTypeList = Object.assign([], res.data);
      }
    });
  }

  /**
  * Monitor any change to @Input source caused by form's components
  */
  ngOnChanges(changes: SimpleChanges) {
    // IMPORTANT: Form is initialize only after source has data
    if (changes['source']) {
        // console.log(this.source);
        this.initialize();
    }

    // IMPORTANT: Approval Types retrieved for request only base on tcode
    if (changes['tcode'] && this.tcode) {
      this.store.dispatch(getRequestApprovalAction(this.tcode));
    }

    // Just for information
    if (changes['myForm.valid']) {
        console.log('Oh yeah');
    }
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initNav();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    // this.requestApproval.unsubscribe();
  }

  /**
  * COMPONENT OPERATION
  */

  /**
  * @function initialize
  * Initialize pre-requisite variables for request
  *
  * NOTE:
  * - Request is editable in New, Draft status and user is one of request owners
  * - Request is editable in P. Submit status and user is requestor
  *
  * {@link @function initForm}
  */

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
        // LOGIC: Requestor can change prior to submission rather than return for preparer edit
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

  /**
  * @function initForm
  * Initialize request form with source data based on form builder
  *
  * {@link @function initNav}
  */
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

  /**
  * @function initNav
  * Initialize Navigation for request based on selected language
  *
  * NOTE:
  * - Navigation = What actions available to logged in user based on
  *   1. Request status
  *   2. Role of logged in user in the request
  */
  initNav() {
    this.translateService.get([
      'create', 'new', 'save', 'return', 'submit',
      'withdraw', 'cancel', 'reject', 'approve',
      'abort', 'post', 'revert', 'copy', 'print'
    ])
      .subscribe((res) => {
        this.items = [];

        /**
        * Public actions expose to user in any role
        * 1. Create new request
        * 2. Copy existing request to create new one
        * 3. Print existing request
        */
        if (this.source.data.status !== 'New') {
          this.items.push({
            label: res.create, icon: 'ui-icon-add',
            disabled: this.tcodeService.checkTcodeInMana(this.tcode),
            command: (event) => { this.tcodeService.executeTcode(this.tcode); }
          });

          this.items.push({
            label: res.copy, icon: 'ui-icon-content-copy',
            command: (event) => this.confirmAction('copy')
          });

          this.items.push({
            label: res.print, icon: 'ui-icon-print',
            command: (event) => this.confirmAction('print')
          });
        }

        /**
        * Sequence of conditions:
        * 1. Request status
        * 2. User role in request
        */
        switch (this.source.data.status) {
          case 'New': // Owners: Save
            this.items.push({
              label: res.save, icon: 'ui-icon-save',
              command: (event) => this.confirmAction('save')
            });
            break;

          case 'Draft': // Onwers: Save, Submit
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({
                label: res.save, icon: 'ui-icon-save',
                command: (event) => this.confirmAction('save')
              });

              this.items.push({
                label: res.submit, icon: 'ui-icon-send',
                command: (event) => this.confirmAction('submit')
              });
            }
            break;

          case 'P. Submit': // Requestor: Return, Approve
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({
                label: res.return, icon: 'ui-icon-reply',
                command: (event) => this.confirmAction('return')
              });
              this.items.push({
                label: res.approve, icon: 'ui-icon-thumb-up',
                command: (event) => this.confirmAction('approve')
              });
            }
            break;

          case 'In progress':
            // Owners: Withdraw, Cancel
            // PIC: Return, Reject, Approve
            console.log(this.user.username, this.source.data.owner, this.source.data.pic);
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({
                label: res.withdraw, icon: 'ui-icon-subdirectory-arrow-left',
                command: (event) => this.confirmAction('withdraw')
              });

              this.items.push({
                label: res.cancel, icon: 'ui-icon-no-sim',
                command: (event) => this.confirmAction('cancel')
              });
            }

            if (this.source.data.pic.username === this.user.username) {
              this.items.push({
                label: res.return, icon: 'ui-icon-reply',
                command: (event) => this.confirmAction('return')
              });

              this.items.push({
                label: res.reject, icon: 'ui-icon-thumb-down',
                command: (event) => this.confirmAction('reject')
              });

              this.items.push({
                label: res.approve, icon: 'ui-icon-thumb-up',
                command: (event) => this.confirmAction('approve')
              });
            }
            break;

          case 'P. Withdraw': // Requestor: Return, Approve
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({
                label: res.return, icon: 'ui-icon-reply',
                command: (event) => this.confirmAction('return')
              });

              this.items.push({
                label: res.approve, icon: 'ui-icon-thumb-up',
                command: (event) => this.confirmAction('approve')
              });
            }
            break;

          case 'P. Cancel': // Requestor: Return, Approve
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({
                label: res.return, icon: 'ui-icon-reply',
                command: (event) => this.confirmAction('return')
              });

              this.items.push({
                label: res.approve, icon: 'ui-icon-thumb-up',
                command: (event) => this.confirmAction('approve')
              });
            }
            break;

          case 'Cancelled': // No available action
            break;

          case 'Rejected': // No available action
            break;

          case 'Approved': // Owners: Abort
            if (this.source.data.owner.includes(this.user.username)) {
              this.items.push({
                label: res.abort, icon: 'ui-icon-pan-tool',
                command: (event) => this.confirmAction('abort')
              });
            }

            // Below is reserved for tcode: 4n, and role is super user
            // this.items.push({ label: res.post, icon: 'ui-icon-done', command: (event) => this.confirmAction('19') });
            break;

          case 'P. Abort': // Requestor: Return, Approve
            if (this.source.data['requestor'].username === this.user.username) {
              this.items.push({
                label: res.return, icon: 'ui-icon-reply',
                command: (event) => this.confirmAction('return')
              });

              this.items.push({
                label: res.approve, icon: 'ui-icon-thumb-up',
                command: (event) => this.confirmAction('approve')
              });
            }
            break;

          case 'Aborted': // No available action
            break;

          case 'Posted':
            // Below is reserved for tcode: 4n, and role is super user
            // this.items.push({ label: res.revert, icon: 'ui-icon-done', command: (event) => this.confirmAction('revert') });
            break;

          default:
            break;
        }
      });
  }

  /**
  * @function confirmAction
  * Ensure user confim intention to execute certain action
  *
  * @param {string} action
  *
  * {@link @function executeTcode}
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

  /**
  * @function executeAction
  * To validate form validity and emit action request container for appropriate proccessing
  */
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

  /**
  * @function markAllDirty
  * To validate all form fields for user awareness
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
  * @function filterUserSingle
  * Real-time suggestions of user when being typed.
  */
  filterUserSingle(event) {
    const query = event.query;
    console.log(query);
    if (query.length > 1) {
      this.userService.listDataForFormControl(query, '{}', 0, 20)
        .subscribe(data => {
          console.log(data);
          this.filteredUsersSingle = data;
        });
    }
  }

}
