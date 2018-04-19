import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { generateRequestApprovalAction } from '../../../../ngrx/request/requests.actions';
import { insertApproverBeforeAction } from '../../../../ngrx/request/requests.actions';
import { insertApproverAfterAction } from '../../../../ngrx/request/requests.actions';
import { removeApproverAction } from '../../../../ngrx/request/requests.actions';

// For form control
import { UsersServices } from '../../../../ngrx/user/user.service';

import { AppConfig } from '../../../../app.config';
import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services/localStorage.service';
import { ObjectService } from '../../../../nga/services/object.service';
import { SecurityService } from '../../../../nga/services/security.service';

@Component({
  selector: 'request-approval',
  templateUrl: './requestApproval.html'
})
export class RequestApproval implements OnInit, OnDestroy {

  myScope = 'request-approval';

  // Request id
  id = '';

  // Header columns on the fly
  cols: any[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';
  columnOptions: SelectItem[];

  // Context menu
  items: MenuItem[];

  /**
  * TOAST & CONFIRM DIALOG
  */

  // Select item required
  notification = '';
  messageText = '';
  msgApprovalType = '';

  // Remove mandatory approver
  lblApprover = '';
  lblRemoveMandatoryApprover = '';

  // Confirm Dialog
  lblConfirmation = '';
  lblWouldYouConfirm = '';
  lblCancel = '';
  lblConfirm = '';

  // Invited approver form
  display = false;
  insertType = '';

  selectedApprover: any;
  step = '';
  filteredUsersSingle: any[];
  selectedUser = null;

  // Redux based variables
  storeRequest: any;
  requestApprovalType = null;
  requestStatus = '';
  requestApproval: any;

  constructor(
    private activatedRoute: ActivatedRoute,

    private confirmationService: ConfirmationService,

    private translateService: TranslateService,

    private appConfig: AppConfig,
    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private objectService: ObjectService,

    // Form control
    private userService: UsersServices,

    private store: Store<any>,
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorageService.getLang());

    // STORE
    this.storeRequest = this.store.pipe(select('request'));
    this.storeRequest.subscribe(request => {
      // console.log(request);
      this.requestApprovalType = request.data.approval_type;
      this.requestStatus = request.data.status;

      this.requestApproval = request.data.approval || [];
      if (this.requestApproval) {
        this.requestApproval.forEach((obj, index) => {
          obj['seq'] = index;
        });
      }
      // console.log(this.requestApproval);
      // console.log('Status: ', this.requestStatus);
      // console.log('Approval: ', this.requestApproval);
    });
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState();

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
      }
    });

    this.initDataTableColumn();
    this.initMenuItems();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initMenuItems();
      this.initDataTableColumn();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // COMPONENT OPERATION

  /**
  * @function initMenuItems
  * Initialize menu items by language and
  * Set up tasks for each menu item
  */
  initMenuItems() {
    this.translateService.get([
      'stimulate_approval', 'invite_approver_before', 'invite_approver_after', 'remove_approver',
      'notifications', 'selectItemToExecute', 'select_and_save_approval_type',
      'confirmation', 'wouldYouConfirm', 'cancel', 'confirm',
      'approver', 'approver_remove_mandatory',
      'select_an_item', 'before', 'after'
    ])
      .subscribe((res) => {
        this.items = [
          {
            /**
            * GENERATE APPROVAL FLOW
            */
            label: res.stimulate_approval, icon: 'ui-icon-group-add',
            command: (event) => {
              this.confirmationService.confirm({
                message: res.wouldYouConfirm,
                header: res.confirmation,
                icon: 'ui-icon-help',
                accept: () => {
                  if (this.requestApprovalType) {
                    this.store.dispatch(generateRequestApprovalAction(this.id));
                  } else {
                    this.notifyApprovalTypeSelectionRequired();
                  }
                },
                reject: () => {
                }
              });
            }
          },
          {
            /**
            * INSERT APPROVER BEFORE
            */
            label: res.invite_approver_before, icon: 'ui-icon-person-pin',
            command: (event) => {
              if (!this.selectedApprover) {
                this.notifyItemSelectionRequired();
              } else {
                this.display = true;
                this.insertType = 'before';
              }
            }
          },
          {
            /**
            * INSERT APPROVER AFTER
            */
            label: res.invite_approver_after, icon: 'ui-icon-person-pin-circle',
            command: (event) => {
              if (!this.selectedApprover) {
                this.notifyItemSelectionRequired();
              } else {
                this.display = true;
                this.insertType = 'after';
              }
            }
          },
          {
            /**
            * REMOVE INVITED APPROVER
            */
            label: res.remove_approver, icon: 'ui-icon-person-outline',
            command: (event) => {
              if (!this.selectedApprover) {
                this.notifyItemSelectionRequired();
              } else {
                if (this.selectedApprover.type === 'm') {
                  this.notifyCanNotRemoveMandatoryApprover();
                } else {
                  this.confirmationService.confirm({
                    message: res.wouldYouConfirm,
                    header: res.confirmation,
                    icon: 'ui-icon-help',
                    accept: () => {
                      this.store.dispatch(removeApproverAction(this.id, this.selectedApprover.seq));
                      this.selectedApprover = null;
                    },
                    reject: () => {
                    }
                  });
                }
              }
            }
          }
        ];

        /**
        * Centralize all languages customizable items at one place
        */

        // Toast: Select item required
        this.notification = res.notifications;
        this.messageText = res.selectItemToExecute;
        this.msgApprovalType = res.select_and_save_approval_type;

        // Toast: Can not remove mandatory approver
        this.lblApprover = res.approver;
        this.lblRemoveMandatoryApprover = res.approver_remove_mandatory;

        // Confirm Dialog
        this.lblConfirmation = res.confirmation;
        this.lblWouldYouConfirm = res.wouldYouConfirm;
        this.lblConfirm = res.confirm;
        this.lblCancel = res.cancel;
      });
  }

  /**
  * @function initDataTableColumn
  * Initialize table column on the fly for language purpose
  */
  initDataTableColumn() {
    this.translateService.get(['approver', 'step', 'decision', 'decided_at', 'comment', 'selected_item_label'])
      .subscribe((res) => {
        this.selectedItemsLabel = res.selected_item_label;
        this.cols = [
          { field: 'step', header: res.step, width: '15%'  },
          { field: 'fullname', header: res.approver, width: '30%'  },
          { field: 'decision', header: res.decision, width: '15%'},
          { field: 'decided_at', header: res.decided_at, width: '20%'},
          { field: 'comment', header: res.comment, width: '20%' },
        ];

        this.selectedColumns = JSON.parse(JSON.stringify(this.cols));
        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
        // console.log(this.cols, this.columnOptions);
      });
  }

  /**
  * @function insertApprover
  * Insert an approver item before or after an identified approver
  * Approach: Insert is made based on the sequence of selected item
  * This avoid multiple insert if username is used and username exists multiple in flow
  */
  insertApprover() {
    this.display = false;
    // console.log(this.selectedUser);

    if (this.legitimateApprover) {
      const approval = {
        seq: this.selectedApprover.seq,
        username: this.selectedUser.username,
        fullname: this.selectedUser.fullname,
        step: this.step
      }

      switch (this.insertType) {
        case 'before':
          this.store.dispatch(insertApproverBeforeAction(this.id, approval));
          this.insertType = '';
          this.selectedUser = null;
          this.selectedApprover = null;
          break;

        case 'after':
          this.store.dispatch(insertApproverAfterAction(this.id, approval));
          this.insertType = '';
          this.selectedUser = null;
          this.selectedApprover = null;
          break;

        default:
          this.insertType = '';
          this.selectedUser = null;
          this.selectedApprover = null;
          break;
      }
    }
  }

  /**
  * @function legitimateApprover
  * A helper to check if invited Approver is eligible
  * Usage: [disable] of proceed button and insertApprover function
  */
  legitimateApprover() {
    if (this.selectedUser) {
      return (this.objectService.hasProp(this.selectedUser, 'username') && this.objectService.hasProp(this.selectedUser, 'fullname'));
    } else {
      return false;
    }
  }

  /**
  * @function notifyApprovalTypeSelectionRequired
  * Notify user to select an approver item before operation
  */
  notifyApprovalTypeSelectionRequired() {
    const toastData = {
      type: 'warning',
      title: this.notification,
      msg: this.msgApprovalType,
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);
  }

  /**
  * @function notifyItemSelectionRequired
  * Notify user to select an approver item before operation
  */
  notifyItemSelectionRequired() {
    const toastData = {
      type: 'warning',
      title: this.notification,
      msg: this.messageText,
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);
  }

  /**
  * @function notifyCanNotRemoveMandatoryApprover
  * Notify user that mandatory approver can not be removed
  */
  notifyCanNotRemoveMandatoryApprover() {
    const toastData = {
      type: 'warning',
      title: this.lblApprover,
      msg: this.lblRemoveMandatoryApprover,
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);
  }

  /**
  * AUTO COMPLETE - USER
  * @function filterUserSingle
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
