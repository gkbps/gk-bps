import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { HttpClientService, SecurityService } from '../../nga/services/';
import { RequestHistory } from './requestHistory.models';

@Injectable()
export class RequestHistoriesServices {

  suffixUrl = '/requestHistories/';

  constructor(
    private appConfig: AppConfig,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
  ) { }

  resetRequestHistories() {
    return Promise.resolve([]);
  }

  action1x(_id, first: number, rows: number) {
    const pagination = {
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination,
      disableToast: true
    };

    return this.httpClientService.get(this.suffixUrl + 'list/' + _id, reqOptions)
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

}
