import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { HttpClientService } from '../../nga/services/';
import { ApprovalItem } from '../_models/approvalItem.model';

@Injectable()
export class ApprovalItemService {

  suffixUrl = '/requestApproval/';
  suffixApprovalItemsUrl = '/requestApproval/items/';
  suffixApprovalTypesUrl = '/requestApproval/types/';
  suffixRequestUrl = '/gkclients/request/';

  // Redux based variables
  standardApprovalItems: Observable<Array<ApprovalItem>>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    this.standardApprovalItems = store.select( myStore => myStore.standardApprovalItems );
  }

  /**************************************************************************************
   * IMPORTANT NOTES
   * - Return: return from httpClientService is the full response with header and body
   * in order to get data by context, remeber to use 'res.body.data'
   *
   * - Return processing: Instead returning the data directly for consuming purpose,
   * it change state of ngrx store redux for a centrally global impact
   **************************************************************************************/

  findStandardApprovalItems() {
    return this.httpClientService.get(this.suffixApprovalItemsUrl)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'LOAD_STANDARD_APPROVAL_ITEMS', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  // APPROVAL TYPES - DO NOT USE STORE DUE TO SINGLETON APPROVAL TYPE CAN NOT ACCOMODATE MULTIPLE COMPONENTS' OPERATION

  findApprovalTypesByTcode(tcode) {
    return this.httpClientService.get(this.suffixApprovalTypesUrl + tcode);
  }

  apiGetApprovalTypesListByTcode(tcode) {
    return this.httpClientService.get(this.suffixApprovalTypesUrl + 'api/' + tcode);
  }

  createApprovalType(approvalType) {
    return this.httpClientService.post(this.suffixApprovalTypesUrl, approvalType);
  }

  updateApprovalType(approvalType) {
    return this.httpClientService.put(this.suffixApprovalTypesUrl + approvalType._id, approvalType)
  }

  disableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'disable/' + _id, {})
  }

  enableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'enable/' + _id, {})
  }

  markApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'mark/' + _id, {})
  }

  unmarkApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'unmark/' + _id, {})
  }

  deleteApprovalType(_id) {
    return this.httpClientService.delete(this.suffixApprovalTypesUrl + _id, {})
  }

}
