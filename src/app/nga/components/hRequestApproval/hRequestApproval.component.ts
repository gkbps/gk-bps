import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  LocalStorageService,
} from '../../../nga/services';

import { ApprovalItemService } from '../../../store/_services/approvalItem.service';

@Component({
  selector: 'h-request-approval',
  templateUrl: './hRequestApproval.html',
  styleUrls: ['./hRequestApproval.scss'],
})
export class HRequestApproval implements OnInit, OnDestroy, OnChanges {

  myScope = 'h-request-approval';

  @Input() tcode: any;
  @Input() standardApprovalItems = [];

  approvalTypeList = []; // List of approval types for particular request tcode
  selectedApprovalType: any; // Specific approval type is selected for operation

  sourceApprovalItems: any[]; // List of standard approval items (after reduced) as source
  targetApprovalItems: any[]; // List of approval items selected for specific & selected approval type

  token: string;

  items: MenuItem[];

  // Notification
  msgs: Message[] = [];
  notification = '';
  messageText = '';

  // Dialog variables
  display: boolean = false;
  approvalTypeDesc = '';
  dialogType = 'new';

  constructor(

    private globalState: GlobalState,
    private translateService: TranslateService,
    private securityService: SecurityService,

    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService,
    private approvalItemService: ApprovalItemService
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorageService.getLang());
  }

  ngOnInit() {
    // Local subscription to global state
    // console.log(this.tcode);
    // console.log(this.standardApprovalItems); // [] at first, use ngOnChanges to detect

    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    // Get user and preference
    const user = this.securityService.getCurrentUser();

    this.token = this.securityService.getToken();

    this.initNav();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['standardApprovalItems']) {
    //   console.log(this.standardApprovalItems);
    // }
  }

  selectApprovalType(selectedApprovalType) {
    // console.log('Selected Approval Type:', selectedApprovalType);
    this.selectedApprovalType = selectedApprovalType;
    this.initApprovalPickList(selectedApprovalType.items)
  }

  initApprovalPickList(selectedApprovalItems) {
    // console.log('Selected Approval Items:', selectedApprovalItems);
    this.targetApprovalItems = selectedApprovalItems;
    const selectedFx = selectedApprovalItems.map((item) => item.fx);
    // console.log(selectedFx);
    this.sourceApprovalItems = this.standardApprovalItems.filter((item, index) => !selectedFx.includes(item.fx));
  }

  /****************************************************************************/
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

    this.approvalItemService.findApprovalTypesByTcode(this.tcode)
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.approvalTypeList = responseBodyData['body'].data;
      }, error => {
        console.log(error);
      });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  /****************************************************************************/

  initNav() {
    this.translateService.get(['create', 'view', 'edit', 'save', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange', 'notifications', 'selectItemToExecute'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.create, icon: 'ui-icon-add',
            command: (event) => {
              this.approvalTypeDesc = '';
              this.showDialog('new');
            }
          },
          { separator: true },
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
          { separator: true },
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
          { separator: true },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.changeStatus('disable')
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.changeStatus('enable')
          },
          { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.changeStatus('mark')
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.changeStatus('unmark')
          },
          { separator: true },
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
          { separator: true },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => alert('Show change here')
          },
        ];

        this.notification = res.notifications;
        this.messageText = res.selectItemToExecute;

      });
  }

  /****************************************************************************/
  selectItemRequired() {
    console.log('select an item to execute');
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: this.notification, detail: this.messageText});
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
  }

  showDialog(dialogType) {
    this.dialogType = dialogType;
    this.display = true;
  }

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
          }
          this.approvalItemService.createApprovalType(updatedApprovalType)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);
              let newApprovalList = JSON.parse(JSON.stringify(this.approvalTypeList));
              updatedApprovalType['_id'] = responseBodyData['body'].data;
              newApprovalList.push(updatedApprovalType);
              this.approvalTypeList = newApprovalList;
              // console.log(this.approvalTypeList);
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
          }

          this.approvalItemService.updateApprovalType(updatedApprovalType)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);
              this.selectedApprovalType.desc = this.approvalTypeDesc;
              // console.log(this.approvalTypeList);
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
        }

        this.approvalItemService.updateApprovalType(updatedApprovalType)
          .subscribe(responseBodyData => {
            // console.log(responseBodyData);
            this.selectedApprovalType.items = this.targetApprovalItems;
            console.log(this.approvalTypeList);
          }, error => {
            console.log(error);
          });

        break;
      default:
    }
    this.display = false;
  }

  deleteApprovalType(id) {
    this.approvalItemService.deleteApprovalType(id)
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        let tmpList = this.approvalTypeList.filter((element) => {
          return element._id != id;
        })
        this.selectedApprovalType = null;
        this.approvalTypeList = tmpList;
      }, error => {
        console.log(error);
      });
  }

  changeStatus(changeType) {
    if (this.selectedApprovalType) {
      switch (changeType) {
        case 'disable':
          this.approvalItemService.disableApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);
              this.selectedApprovalType.status1 = 'Inactive';
            }, error => {
              console.log(error);
            });
          break;

        case 'enable':
          this.approvalItemService.enableApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);
              this.selectedApprovalType.status1 = 'Active';
            }, error => {
              console.log(error);
            });
          break;

        case 'mark':
          this.approvalItemService.markApprovalType(this.selectedApprovalType._id)
            .subscribe(responseBodyData => {
              // console.log(responseBodyData);
              this.selectedApprovalType.status2 = 'Marked';
            }, error => {
              console.log(error);
            });
          break;

        case 'unmark':
          this.approvalItemService.unmarkApprovalType(this.selectedApprovalType._id)
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
