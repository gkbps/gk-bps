import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { HttpClientService } from '../../nga/services/';
import { Datasource } from '../_models/datasource.model';

@Injectable()
export class DatasourceService {

  // Redux based variables
  datasource: Observable<Array<Datasource>>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    this.datasource = store.select( myStore => myStore.datasource );
  }

  getDatasourceByModule(module: string, params) {
    // const params = {
    //   filter: filter,
    //   sort: sort,
    //   first: first,
    //   rows: rows
    // };

    const reqOptions = {
      params: params
    };

    return this.httpClientService.get('/' + module + '/datasource', reqOptions)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'GET_DATASOURCE', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

}
