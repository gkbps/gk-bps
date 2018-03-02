import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { User } from './users.models';

@Injectable()
export class UserService {

  suffixUrl = '/users/';

  constructor(
    private httpClientService: HttpClientService,
  ) {
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
