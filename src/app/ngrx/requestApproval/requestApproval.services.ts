import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';

@Injectable()
export class RequestApprovalServices {

  suffixApprovalTypesUrl = '/requestApproval/types/';

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  // APPROVAL TYPES - DO NOT USE STORE DUE TO SINGLETON APPROVAL TYPE CAN NOT ACCOMODATE MULTIPLE COMPONENTS' OPERATION

  findApprovalTypesByTcode(tcode) {
    return this.httpClientService.get(this.suffixApprovalTypesUrl + tcode, { disableToast: true })
      .map(res => res.body.data || []);
  }

}
