import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { HttpClientService, SecurityService } from '../../nga/services/';
import { User } from './user.models';

@Injectable()
export class UsersServices {

  suffixUrl = '/users/';

  constructor(
    private appConfig: AppConfig,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
  ) {
  }

  action1x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl, reqOptions)
      .map((res) => {
        /* res {
         *  data: User[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

  /**************************************************************************************
   * IMPORTANT NOTES
   * - Return: return from httpClientService is the full response with header and body
   * in order to get data by context, remeber to use 'res.body.data'
   *
   * - Return processing: Instead returning the data directly for consuming purpose,
   * it change state of ngrx store redux for a centrally global impact
   **************************************************************************************/

  /**
   * findAPIListPagination
   * the function to lazy paginate the master list to improve system performance.
   *
   * @param {string} filter
   * @param {string} sort
   * @param {number} first
   * @param {number} rows
   * @returns gkUsers[] => ngrx
   * @memberof GkUserService
   */
  findAPIListPagination(filter: string, sort: string, first: number, rows: number) {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + 'apiListPagination', reqOptions)
      .map((res) => {
        return res.body.data || {};
      });

  }

  /**
   * listDataForFormControl
   * the function to lazy paginate the list data for form control
   *
   * @param {string} filter
   * @param {string} sort
   * @param {number} first
   * @param {number} rows
   * @returns User[]
   * @memberof UserService
   */
  listDataForFormControl(filter: string, sort: string, first: number, rows: number) {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + 'controls', reqOptions)
      .map((res) => {
        return res.body.data || {};
      });

  }

  getUsers() {
    return Promise.resolve([
      { fullname: 'hoang dong', username: 'htdong' },
      { fullname: 'le thao', username: 'ltpthao' },
      { fullname: 'hoang hieu', username: 'hthieu' },
      { fullname: 'hoang thuy', username: 'htthuy' }
    ]);
  }

  getMockUsers() {
    return ([
      { fullname: 'hoang dong', username: 'htdong' },
      { fullname: 'le thao', username: 'ltpthao' },
      { fullname: 'hoang hieu', username: 'hthieu' },
      { fullname: 'hoang thuy', username: 'htthuy' }
    ]);
  }
}
