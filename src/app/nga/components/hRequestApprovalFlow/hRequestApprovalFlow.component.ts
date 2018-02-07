import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../../app.config';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  LocalStorageService,
} from '../../../nga/services';

import { Store } from '@ngrx/store';
import { AppStore } from '../../../store/app.store';

import { GkRequest } from '../../../store/_models/gkRequest.model';
import { GkRequestService } from '../../../store/_services/gkRequest.service';

import { GkUser } from '../../../store/_models/gkUser.model';
import { GkUserService } from '../../../store/_services/gkUser.service';

@Component({
  selector: 'h-request-approval-flow',
  templateUrl: './hRequestApprovalFlow.html',
  // styleUrls: ['./requestApprovalFlow.scss'],
})
export class HRequestApprovalFlow implements OnInit, OnDestroy {
  myScope = 'h-request-approval';

  id ='';
  gb: any;

  items: MenuItem[];

  // Header columns on the fly
  loading: boolean;
  cols: any[];
  columnOptions: SelectItem[];

  // Pagination
  first = 0;
  rows = 10;
  totalRecords: number;
  multiSortMeta: any;

  // Notification
  msgs: Message[] = [];
  notification = '';
  messageText = '';

  requestApprovers: any;
  selectedApprover: any;

  // Dialog variables
  display: boolean = false;
  position = [];
  selectedPosition = 'before';
  step = '';
  selectedUser = null;

  // Label
  lblConfirmation = '';
  lblWouldYouConfirm = '';
  lblCancel = '';
  lblConfirm = '';
  lblApprover = '';
  lblRemoveMandatoryApprover = '';

  // Redux based variables
  requestStatus = '';
  selectedGkRequest: Observable<GkRequest>;
  private subscriptionSelectedGkRequest: Subscription;

  apiGkUsers: Observable<Array<GkUser>>;
  private gkUserSubscription: Subscription;
  filteredUsersSingle: any[];

  myUrl = '';

  constructor(
    private appConfig: AppConfig,
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private translateService: TranslateService,
    private securityService: SecurityService,

    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService,

    private gkRequestService: GkRequestService,
    private gkUserService: GkUserService,

    private store: Store<AppStore>,
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorageService.getLang());
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        console.log(this.id);
        // this.myUrl = this.appConfig.apiUrl + '/requestFiles/upload/' + this.id;
      }
    });

    this.initDataTableColumn();
    this.initMenuItems();

    // Get user and preference
    const user = this.securityService.getCurrentUser();
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
      this.initMenuItems();
      this.initDataTableColumn();
    });

    // Redux store
    this.selectedGkRequest = this.gkRequestService.selectedGkRequest;
    this.subscriptionSelectedGkRequest = this.selectedGkRequest
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.requestStatus = responseBodyData.status;
        this.requestApprovers = responseBodyData.approval;
      }, error => {
        console.log(error);
      });

    this.apiGkUsers = this.gkUserService.apiGkUsers;
    this.gkUserSubscription = this.apiGkUsers
      .subscribe(responseBodyData => {
        console.log(responseBodyData);
        this.filteredUsersSingle = responseBodyData['data'];
      }, error => {
        console.log(error);
      });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscriptionSelectedGkRequest.unsubscribe();
    this.gkUserSubscription.unsubscribe();
  }

  /****************************************************************************/

  // initSampleData() {
  //   this.requestApprovers = [
  //     {
  //       type: 'm',
  //       approver: {
  //         username: 'htdong',
  //         fullname: 'Hoang Thanh Dong'
  //       },
  //       step: 'Direct Manager',
  //       comment: '',
  //       decision: '',
  //       decided_at: ''
  //     },
  //     {
  //       type: 'm',
  //       approver: {
  //         username: 'ltpthao',
  //         fullname: 'Le Thi Phuong Thao'
  //       },
  //       step: 'COO',
  //       comment: '',
  //       decision: '',
  //       decided_at: ''
  //     },
  //     {
  //       type: 'm',
  //       approver: {
  //         username: 'hgkhanh',
  //         fullname: 'Hoang Gia Khanh'
  //       },
  //       step: 'CEO',
  //       comment: '',
  //       decision: '',
  //       decided_at: ''
  //     },
  //   ]
  // }

  initMenuItems() {
    this.translateService.get([
      'stimulate_approval', 'invite_approver', 'remove_approver',
      'notifications', 'selectItemToExecute',
      'confirmation', 'wouldYouConfirm', 'cancel', 'confirm',
      'approver', 'approver_remove_mandatory',
      'select_an_item', 'before', 'after'
    ])
      .subscribe((res) => {

        this.items = [
          {
            label: res.stimulate_approval, icon: 'ui-icon-group-add',
            command: (event) => {
              console.log(this.selectedApprover);
              this.gkRequestService.generateApprovalFlow(this.id);
            }
          },
          { separator: true },
          {
            label: res.invite_approver, icon: 'ui-icon-person-add',
            command: (event) => {
              if (!this.selectedApprover) {
                this.notifyItemSelectionRequired();
              } else {
                this.display = true;
              }
            }
          },
          {
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
                      this.removeApprover();
                    },
                    reject: () => {

                    }
                  });
                }
              }
            }
          }
        ];

        this.notification = res.notifications;
        this.messageText = res.selectItemToExecute;

        this.lblConfirmation = res.confirmation;
        this.lblWouldYouConfirm = res.wouldYouConfirm;
        this.lblConfirm = res.confirm;
        this.lblCancel = res.cancel;

        this.lblApprover = res.approver;
        this.lblRemoveMandatoryApprover = res.approver_remove_mandatory;

        this.position = [
          { label: res.before, value: 'before' },
          { label: res.after, value: 'after' },
        ];

      });
  }

  initDataTableColumn() {
    this.translateService.get(['approver', 'step', 'decision', 'decided_at', 'comment'])
      .subscribe((res) => {
        this.cols = [
          { field: 'approver.fullname', header: res.approver, width: '30%'  },
          { field: 'step', header: res.step, width: '15%'  },
          { field: 'decision', header: res.decision, width: '15%'},
          { field: 'decided_at', header: res.decided_at, width: '20%'},
          { field: 'comment', header: res.comment, width: '20%' },
        ];

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
        // console.log(this.cols, this.columnOptions);
      });
  }

  notifyItemSelectionRequired() {
    console.log('select an item to execute');
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: this.notification, detail: this.messageText});
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
  }

  notifyCanNotRemoveMandatoryApprover() {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: this.lblApprover, detail: this.lblRemoveMandatoryApprover});
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
  }

  removeApprover() {

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

  addApprover() {

  }
}
