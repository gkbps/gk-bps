import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { ApprovalItem } from './approvalItem.model';

@Injectable()
export class ApprovalItemsServices {

  suffixApprovalItemsUrl = '/requestApproval/items/';

  // RPC not via Ngrx store
  suffixApprovalTypesUrl = '/requestApproval/types/';

  constructor(
    private httpClientService: HttpClientService,
  ) {}

  findStandardApprovalItems() {
    return this.httpClientService.get(this.suffixApprovalItemsUrl, { disableToast: true })
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      });
  }

  // APPROVAL TYPES - DO NOT USE STORE DUE TO SINGLETON APPROVAL TYPE CAN NOT ACCOMODATE MULTIPLE COMPONENTS' OPERATION

  findApprovalTypesByTcode(tcode) {
    return this.httpClientService.get(this.suffixApprovalTypesUrl + tcode, { disableToast: true });
  }

  createApprovalType(approvalType) {
    return this.httpClientService.post(this.suffixApprovalTypesUrl, approvalType, { disableToast: false });
  }

  updateApprovalType(approvalType) {
    return this.httpClientService.put(this.suffixApprovalTypesUrl + approvalType._id, approvalType, { disableToast: false });
  }

  disableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'disable/' + _id, {}, { disableToast: false });
  }

  enableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'enable/' + _id, {}, { disableToast: false });
  }

  markApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'mark/' + _id, {}, { disableToast: false });
  }

  unmarkApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'unmark/' + _id, {}, { disableToast: false });
  }

  deleteApprovalType(_id) {
    return this.httpClientService.delete(this.suffixApprovalTypesUrl + _id, { disableToast: false });
  }

}
