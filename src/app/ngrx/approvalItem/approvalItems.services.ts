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
    return this.httpClientService.get(this.suffixApprovalItemsUrl)
      .map((res) => {
        return res.body.data || {};
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
    return this.httpClientService.put(this.suffixApprovalTypesUrl + approvalType._id, approvalType);
  }

  disableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'disable/' + _id, {});
  }

  enableApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'enable/' + _id, {});
  }

  markApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'mark/' + _id, {});
  }

  unmarkApprovalType(_id) {
    return this.httpClientService.patch(this.suffixApprovalTypesUrl + 'unmark/' + _id, {});
  }

  deleteApprovalType(_id) {
    return this.httpClientService.delete(this.suffixApprovalTypesUrl + _id, {});
  }

}
