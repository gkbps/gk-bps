import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import {
  getRequestAction,
  resetRequestAction,
  addRequestAction,
  saveRequestAction,
  submitRequestAction,
  withdrawRequestAction,
  cancelRequestAction,
  returnRequestAction,
  approveRequestAction,
  rejectRequestAction,
  abortRequestAction,
  // EXCLUDED AS BELOW ARE ONLY USED IN 41, 42, 43, 44, 45
  // postRequestAction,
  // revertRequestAction,
  // createRequestJournalAction,
  // postRequestJournalAction,
  // revertRequestJournalAction,
  // moveRequestApprovalAction,
  // moveRequestStatusAction
} from '../../../../../../ngrx/request/requests.actions';

import {
  getGkClientRequestAction,
  saveGkClientRequestAction,
  postGkClientRequestAction,
  revertGkClientRequestAction
} from '../../../../../../ngrx/gkClient/gkClients.actions';


import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { SecurityService } from '../../../../../../nga/services/security.service';
import { TcodeService } from '../../../../../../nga/services/tcode.service';

import { BaseComponent } from '../../../../../base';

import { RequestHeader } from '../../../../../../ngh/modules/3n/requestHeader/requestHeader.component';

import { GkClnForm } from '../gkclnForm/gkclnForm.component';

@Component({
  templateUrl: 'gkcln31.component.html'
})
export class GkCln31Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties

  // To access the children components
  @ViewChild(RequestHeader) myRequestHeader;
  @ViewChild(GkClnForm) myRequestBody;

  // Tcode related varivables
  tcode = 'gkcln31'; // For new Item
  prefix = 'gkcln';
  action = '31';

  // State related variables
  isRequest = true;
  isEditable: boolean;

  // Request related variables
  id = '';
  request: any;
  requestBody: any;
  requestFooter: any;
  // Documents: Upload Ajax handle case by case
  // Approval: Store with header to reduce read at server and client. Check Approval valid at frontend and backend
  requestComment: any;
  requestHistory: any;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,

    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();

    // Store
    this.request = this.store.pipe(select('request'));
    this.requestBody = this.store.pipe(select('gkClientRequest'));

    // Get status of request to define the isEditable
    this.request.subscribe(res => {
      // console.log(res);
      if (!res.pending && ! res.error) {
        if (['New', 'Draft'].includes(res.data.status)) {
          this.isEditable = true;
        } else {
          this.isEditable = false;
        }

        // IMPORTANT: To assign id after save new
        // this.id = res.data._id;
      }
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];

        // Help on request after New status
        this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

        this.store.dispatch(getRequestAction(this.id));
        this.store.dispatch(getGkClientRequestAction(this.id));
      } else {

        // Help on request in New status
        this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

        // Reset Store value of Request
        this.store.dispatch(resetRequestAction(this.tcode));
      }
    });

    this.subscribeLocalState();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
  }

  unsubscribeLocalState() {
  }

  // COMPONENT OPERATION

  /**
  * @function onSelectAction
  * Listen event from (requestHeader) component to instruct the process
  *
  * @param event
  */
  onSelectAction(event) {
    // console.log(event);

    switch (event.action) {
      case 'save':
        // console.log('save.01-Save requestHeader to request!');
        if (event.valid) {
          if (event.data.status === 'New') {
            this.store.dispatch(addRequestAction(event.data, this.tcode));
          } else {
            this.store.dispatch(saveRequestAction(event.data));

            // console.log('save.02.-Save requestBody to module request!');
            this.myRequestBody.saveRequest();
          }
        }
        break;

      case 'submit':
        // console.log('save.01-Submit requestHeader to request!');
        this.store.dispatch(submitRequestAction(event.data));

        // console.log('save.02.-Save requestBody to module request!');
        this.myRequestBody.saveRequest();
        break;

      case 'withdraw':
        // console.log('withdraw.00-Withdraw requestHeader to request!');
        this.store.dispatch(withdrawRequestAction(this.id));
        break;

      case 'cancel':
        // console.log('cancel.00-Cancel requestHeader to request!');
        this.store.dispatch(cancelRequestAction(this.id));
        break;

      case 'return':
        // console.log('return.00-Return requestHeader to request!');
        this.store.dispatch(returnRequestAction(this.id));
        break;

      case 'approve':
        // console.log('approve.00-Approve requestHeader to request!');
        const invitedApprover = {
          id: 'htdong',     // event.data
          step: 'Invited'   // event.data
        }
        this.store.dispatch(approveRequestAction(this.id, invitedApprover.id, invitedApprover.step));
        break;

      case 'reject':
        // console.log('reject.00-Reject requestHeader to request!');
        // this.store.dispatch(rejectRequestAction(this.id));
        break;

      case 'abort':
        // console.log('abort.00-Abort requestHeader to request!');
        this.store.dispatch(abortRequestAction(this.id));
        break;

      // Below are reserved for other Tcode
      // case 'journal':
      //   console.log('post.00-Post data to master data/ transaction data');
      //   // this.store.dispatch(postRequestAction(this.id));
      //   break;

      // case 'post':
      //   console.log('post.00-Post data to master data/ transaction data');
      //   // this.store.dispatch(postRequestAction(this.id));
      //   break;

      // case 'revert':
      //   console.log('Revert data from transaction data');
      //   // if success then back to change status of request to "APPROVED"
      //   break;

      case 'copy':
        // console.log('Copy data from request data');
        // if success then back to open new request with "DRAFT" status and id
        break;

      case 'print':
        // console.log('To show form in printable format');
        break;

      default:
        break;
    }
  }

  saveRequestBody(event) {
    // console.log(event);
    this.store.dispatch(saveGkClientRequestAction(event.data));
  }

}
