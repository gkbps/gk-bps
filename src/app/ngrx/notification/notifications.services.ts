import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { HttpClientService, SecurityService } from '../../nga/services/';
import { Notification } from './notification.model';

@Injectable()
export class NotificationsServices {

  suffixUrl = '/notifications/';

  constructor(
    private appConfig: AppConfig,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
  ) { }

  action1x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      disableToast: true,
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl, reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

  action12(_id) {
    return this.httpClientService.get(this.suffixUrl + _id)
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action16(_id) {
    return this.httpClientService.put(this.suffixUrl + _id + '/mark', {})
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action17(_id) {
    return this.httpClientService.put(this.suffixUrl + _id + '/unmark', {})
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action18(_id) {
    return this.httpClientService.delete(this.suffixUrl + _id)
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

}
