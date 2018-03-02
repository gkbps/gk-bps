import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**/
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
  postRequestAction,
  revertRequestAction
} from '../../../../../../ngrx/request/requests.actions';
/**/

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../../../../nga/services';
import { BaseComponent } from '../../../../../base';

import { RequestHeader } from '../../../../../../nga/components/requestHeader/requestHeader.component';
// import { GkClnForm } from '../gkclnForm/gkclnForm.component';
// import { GkRequest } from '../../../../../../store/_models/gkRequest.model';

// import { GkRequestService } from '../../../../../../store/_services/gkRequest.service';
// import { GkClientService } from '../../../../../../store/_services/gkClient.service';

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
  @ViewChild(RequestHeader) myRequestHeader;
  // @ViewChild(GkClnForm) myRequestBody;

  tcode = 'gkcln31'; // For new Item

  id = '';
  request: any;
  // requestHeader: any;
  // requestBody: any;
  // requestFooter: any;
    // Documents: Upload Ajax handle case by case
    // Approval: Store with header to reduce read at server and client. Check Approval valid at frontend and backend
  // requestComment: any;
  // requestHistory: any;

  user: any;
  isEditableRequest = false;

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
    super(translateService, globalState, localStorageService, navigationService, menuService);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();

    this.request = this.store.pipe(select('request'));
    console.log(this.request);

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];

        // Help on request after New status
        this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

        this.store.dispatch(getRequestAction(this.id));
      } else {

        // Help on request in New status
        this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

        // Reset Store value of Request
        this.store.dispatch(resetRequestAction(this.tcode));
      }
    });
    //
    // this.subscribeLocalState();
    //
    // Get user and preference
    this.user = this.securityService.getCurrentUser();
  }
  /****************************************************************************/

  // Get Action from requestHeader Component to instruct the process
  onSelectAction(event) {
    console.log(event.action);

    switch (event.action) {
      case 'save':
        console.log('Save body to DB with validation!');
        // if (this.myRequestBody) {
        //   this.myRequestBody.saveRequest('save');
        // }
        break;

      case 'submit':
        console.log('Save body to DB with validation!');
        // if success then back to change status of request to "IN PROGRESS"
        // if (this.myRequestBody) {
        //   this.myRequestBody.saveRequest('submit');
        // }
        break;

      case 'post':
        console.log('Post data to master data/ transaction data');
        // if success then back to change status of request to "POSTED"
        break;

      case 'revert':
        console.log('Revert data from transaction data');
        // if success then back to change status of request to "APPROVED"
        break;

      case 'copy':
        console.log('Copy data from request data');
        // if success then back to open new request with "DRAFT" status and id
        break;

      case 'print':
        break;

      default:
        break;
    }

    // this.requestHeader = {
    //   valid: event.valid,
    //   value: event.value
    // }

    // if (this.id) {
    //   this.myRequestBody.updateParentOnRequestBody();
    // }
  }

  // getRequestBodyChange(event) {
  //   console.log(event);
  //   this.requestBody = event;
  //
  //   if (event.status === 'OK') {
  //     // Inform requestHeader safely to save or submit the request
  //     switch (event.action) {
  //       case 'save':
  //         if (this.myRequestHeader) {
  //           this.myRequestHeader.saveRequestHeader();
  //         }
  //         break;
  //
  //       case 'submit':
  //         if (this.myRequestHeader) {
  //           this.myRequestHeader.submitRequestHeader();
  //         }
  //         break;
  //
  //       default:
  //         break;
  //     }
  //   }
  // }

  /****************************************************************************/
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
    // this.subscription.unsubscribe();
  }

}
