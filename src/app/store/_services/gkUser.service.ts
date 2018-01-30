import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { HttpClientService } from '../../nga/services/';
import { GkUser } from '../_models/gkUser.model';

@Injectable()
export class GkUserService {

  suffixUrl = '/users/';

  // Redux based variables
  apiGkUsers: Observable<Array<GkUser>>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    this.apiGkUsers = store.select( myStore => myStore.apiGkUsers );
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
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'LOAD_API_PAGINATED_GKUSERS', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
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
}
