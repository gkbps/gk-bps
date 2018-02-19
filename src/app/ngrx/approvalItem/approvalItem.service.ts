import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { ApprovalItem } from './approvalItem.model';

@Injectable()
export class ApprovalItemService {

  suffixApprovalItemsUrl = '/requestApproval/items/';

  constructor(
    private httpClientService: HttpClientService,
  ) {
  }

  findStandardApprovalItems() {
    return this.httpClientService.get(this.suffixApprovalItemsUrl)
      .map((res) => {
        return res.body.data || {};
      });
  }
}
