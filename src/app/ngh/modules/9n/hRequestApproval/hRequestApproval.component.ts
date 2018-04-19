import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges  } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services/localStorage.service';
import { SecurityService } from '../../../../nga/services/security.service';

import { ApprovalItemsServices } from '../../../../ngrx/approvalItem/approvalItems.services';

@Component({
  selector: 'h-request-approval',
  templateUrl: './hRequestApproval.html',
  styleUrls: ['./hRequestApproval.scss'],
})
export class HRequestApproval implements OnInit, OnDestroy, OnChanges {

  myScope = 'h-request-approval';

  /**
  * For request related tcode (where request approval is necessary):
  * 1. There are different approval types (i.e.: Standard, Fast track, Exception) for that tcode
  * 2. Each approval type include list of standard approval items already selected
  * 3. Other standard approval items available for further selection is filtered from full standard approval items list
  */

  @Input() tcode: any;
  @Input() standardApprovalItems = [];

  // Approval Types
  approvalTypesList = []; // List of approval types of a particular request tcode
  selectedApprovalType: any; // Approval type is selected for operation

  // Approval Items
  sourceApprovalItems: any[]; // List of standard approval items (after reduced) as source
  targetApprovalItems: any[]; // List of approval items selected for specific & selected approval type

  items: MenuItem[];

  // Notification
  notification = '';
  messageText = '';

  // Dialog
  display = false;
  dialogType = 'new';
  approvalTypeDesc = '';

  constructor(
    private globalState: GlobalState,
    private translateService: TranslateService,
    private securityService: SecurityService,

    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService,
    private approvalItemsService: ApprovalItemsServices
  ) {
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    // Get user and preference
    const user = this.securityService.getCurrentUser();

    this.initNav();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['standardApprovalItems']) {
      // console.log(this.standardApprovalItems);
    }
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translateService.use(lang);
      this.initNav();
    });

    this.approvalItemsService.findApprovalTypesByTcode(this.tcode)
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.approvalTypesList = responseBodyData['body'].data;
      }, error => {
        console.log(error);
      });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // COMPONENT OPERATION

  /**
  * @function selectApprovalType
  * Select an approval type defined for particular tcode to initialize Pick List
  *
  * @param selectedApprovalType
  * - selectedApprovalType._id
  * - selectedApprovalType.desc
  * - selectedApprovalType.items - contain an array of approval items selected from standard list
  * - selectedApprovalType.status1
  * - selectedApprovalType.status2
  *
  * {@link initApprovalPickList}
  */
  selectApprovalType(selectedApprovalType) {
    // console.log('Selected Approval Type:', selectedApprovalType);
    this.selectedApprovalType = selectedApprovalType;
    this.initApprovalPickList(selectedApprovalType.items);
  }

  /**
  * @function initApprovalPickList
  * Initialize approval pick list for a selected approval type of a particular tcode
  * By calculating the remaining standard approval items available for further selection
  *
  * @param selectedApprovalItems
  */
  initApprovalPickList(selectedApprovalItems) {
    // console.log('Selected Approval Items:', selectedApprovalItems);

    this.targetApprovalItems = selectedApprovalItems;
    const selectedFx = selectedApprovalItems.map((item) => item.fx);
    // console.log(selectedFx);

    this.sourceApprovalItems = this.standardApprovalItems.filter((item, index) => !selectedFx.includes(item.fx));
  }

  /**
  * @function initNav
  * Initialize navigation bar
  */
  initNav() {
    this.translateService.get([
      'create', 'view', 'edit', 'save',
      'disable', 'enable',
      'mark', 'unmark',
      'delete',
      'viewChange', 'notifications', 'selectItemToExecute'
    ])
      .subscribe((res) => {

        this.items = [
          {
            label: res.create, icon: 'ui-icon-add',
            command: (event) => {
              this.approvalTypeDesc = '';
              this.showDialog('new');
            }
          },
          {
            label: res.edit, icon: 'ui-icon-edit',
            command: (event) => {
              if (this.selectedApprovalType) {
                this.approvalTypeDesc = this.selectedApprovalType.desc;
                this.showDialog('edit');
              } else {
                this.selectItemRequired();
              }
            }
          },
          {
            label: res.save, icon: 'ui-icon-save',
            command: (event) => {
              if (this.selectedApprovalType) {
                this.saveApprovalType('update');
              } else {
                this.selectItemRequired();
              }
            }
          },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.changeStatus('disable')
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.changeStatus('enable')
          },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.changeStatus('mark')
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.changeStatus('unmark')
          },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => {
              if (this.selectedApprovalType) {
                this.deleteApprovalType(this.selectedApprovalType._id);
              } else {
                this.selectItemRequired();
              }
            }
          },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => alert('Show change here')
          },
        ];

        this.notification = res.notifications;
        this.messageText = res.selectItemToExecute;

      });
  }

  /**
  * @function selectItemRequired
  * Notify user to select item for action
  */
  selectItemRequired() {
    const toastData = {
      type: 'warning',
      title: this.notification,
      msg: this.messageText,
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);
  }

  /**
  * @function showDialog
  * Display dialog for action
  */
  showDialog(dialogType) {
    this.dialogType = dialogType;
    this.display = true;
  }

  /**
  * @function saveApprovalType
  * Save or update approval type
  *
  * @param dialogType
  */
  saveApprovalType(dialogType) {
    let updatedApprovalType;

    switch (dialogType) {
      case 'new':
        if (this.approvalTypeDesc.trim()) {
          updatedApprovalType = {
            desc: this.approvalTypeDesc,
            items: [],
            tcode: this.tcode,
            status1: 'Active',
            status2: 'Unmarked'
          };
          this.approvalItemsService.createApprovalType(updatedApprovalType)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              const newApprovalList = JSON.parse(JSON.stringify(this.approvalTypesList));
              updatedApprovalType['_id'] = responseBodyData['body'].data;
              newApprovalList.push(updatedApprovalType);
              this.approvalTypesList = newApprovalList;
              // console.log(this.approvalTypesList);
            }, error => {
              console.log(error);
            });
        } else {

        }
        break;

      case 'edit':
        if (this.approvalTypeDesc.trim()) {
          updatedApprovalType = {
            _id: this.selectedApprovalType._id,
            desc: this.approvalTypeDesc,
            items: this.selectedApprovalType.items,
            tcode: this.selectedApprovalType.tcode
          };

          this.approvalItemsService.updateApprovalType(updatedApprovalType)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              this.selectedApprovalType.desc = this.approvalTypeDesc;
              // console.log(this.approvalTypesList);
            }, error => {
              console.log(error);
            });
        } else {

        }
        break;

      case 'update':
        updatedApprovalType = {
          _id: this.selectedApprovalType._id,
          desc: this.selectedApprovalType.desc,
          items: this.targetApprovalItems,
          tcode: this.selectedApprovalType.tcode
        };

        this.approvalItemsService.updateApprovalType(updatedApprovalType)
          .subscribe(responseBodyData => {
            // console.log(responseBodyData);

            this.selectedApprovalType.items = this.targetApprovalItems;
            // console.log(this.approvalTypesList);
          }, error => {
            console.log(error);
          });

        break;
      default:
    }
    this.display = false;
  }

  /**
  * @function deleteApprovalType
  * Delete an apprval type
  *
  * @param id
  */
  deleteApprovalType(id) {
    this.approvalItemsService.deleteApprovalType(id)
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);

        const tmpList = this.approvalTypesList.filter((element) => {
          return element._id !== id;
        });
        this.selectedApprovalType = null;
        this.approvalTypesList = tmpList;
      }, error => {
        console.log(error);
      });
  }

  /**
  * @function changeStatus
  * Patch status of approval type
  *
  * @param changeType
  */
  changeStatus(changeType) {
    if (this.selectedApprovalType) {
      switch (changeType) {
        case 'disable':
          this.approvalItemsService.disableApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              this.selectedApprovalType.status1 = 'Inactive';
            }, error => {
              console.log(error);
            });
          break;

        case 'enable':
          this.approvalItemsService.enableApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              this.selectedApprovalType.status1 = 'Active';
            }, error => {
              console.log(error);
            });
          break;

        case 'mark':
          this.approvalItemsService.markApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              this.selectedApprovalType.status2 = 'Marked';
            }, error => {
              console.log(error);
            });
          break;

        case 'unmark':
          this.approvalItemsService.unmarkApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);

              this.selectedApprovalType.status2 = 'Unmarked';
            }, error => {
              console.log(error);
            });
          break;

        default:
      }
    } else {
      this.selectItemRequired();
    }
  }
}
