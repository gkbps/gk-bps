import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { HttpClientService } from '../../nga/services/';
import { GkClient } from '../_models/gkClient.model';
import { Dashboard } from '../_models/dashboard.model';

@Injectable()
export class GkClientService {

  suffixUrl = '/gkclients/';
  suffixRequestUrl = '/gkclients/request/';

  // Redux based variables
  paginatedGkClients: Observable<Array<GkClient>>;
  gkClients: Observable<Array<GkClient>>;
  selectedGkClient: Observable<GkClient>;

  paginatedGkClientsDashboard: Observable<Array<Dashboard>>;
  selectedGkClientDashboard: Observable<Dashboard>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    this.paginatedGkClients = store.select( myStore => myStore.paginatedGkClients );
    this.gkClients = store.select( myStore => myStore.gkClients );
    this.selectedGkClient = store.select( myStore => myStore.selectedGkClient );
    this.paginatedGkClientsDashboard = store.select( myStore => myStore.paginatedGkClientsDashboard );
    this.selectedGkClientDashboard = store.select( myStore => myStore.selectedGkClientDashboard );
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
   * findMasterListPagination
   * the function to lazy paginate the master list to improve system performance.
   *
   * @param {string} filter
   * @param {string} sort
   * @param {number} first
   * @param {number} rows
   * @returns gkClients[] => ngrx
   * @memberof GkClientService1
   */
  findMasterListPagination(filter: string, sort: string, first: number, rows: number) {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + '/masterListPagination', reqOptions)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'PAGINATE_GKCLIENTS', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  findDashboardPagination(filter: string, sort: string, first: number, rows: number) {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + '/dashboardPagination', reqOptions)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'PAGINATE_GKCLIENTS_DASHBOARD', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }
  /**
   * createBlankItem
   */
  createBlankItem() {
    const payload = {};
    this.store.dispatch({ type: 'SELECT_GKCLIENT', payload });
  }

  /**
   * createDataItem
   */
  createDataItem(data) {
    const payload = data;
    this.store.dispatch({ type: 'SELECT_GKCLIENT', payload });
  }

  /**
   * findById
   * the function to load a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  findById(_id: string) {
    return this.httpClientService.get(this.suffixUrl + _id)
      .map((res) => {
        return res.body.data || {};
      })
      .map((payload: GkClient) => {
        return { type: 'SELECT_GKCLIENT', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * findRequestById
   * the function to load a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService
   */
  findRequestById(_id: string) {
    return this.httpClientService.get(this.suffixRequestUrl + _id)
      .map((res) => {
        return res.body.data || {};
      })
      .map((payload: GkClient) => {
        return { type: 'SELECT_GKCLIENT_REQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * findOrCreateRequestById
   * the function to load a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService
   */
  findOrCreateRequestById(_id: string) {
    return this.httpClientService.get(this.suffixRequestUrl + 'findsert/' + _id)
      .map((res) => {
        return res.body.data || {};
      })
      .map((payload: GkClient) => {
        return { type: 'SELECT_GKCLIENT_REQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * create
   * the function to create a document
   *
   * @param {*} gkclient
   * @returns gkClient _id (+gkClient) => ngrx
   * @memberof GkClientService1
   */
  create(gkclient: any) {
    return this.httpClientService.post(this.suffixUrl, gkclient)
      .map((res) => {
        return res.body || '';
      })
      .map((resBody) => {
        const payload = JSON.parse(JSON.stringify(gkclient));
        payload['_id'] = resBody.data; // resBody.data captures the newly created Id

        return { type: 'CREATE_GKCLIENT', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * update
   * the function to update changes of a document
   *
   * @param {*} gkclient
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  update(gkclient: any) {
    return this.httpClientService.put(this.suffixUrl + gkclient._id, gkclient)
    .map((res) => {
      return res.body || {};
    })
    .map((resBody) => {
      const payload = resBody['data'];
      return { type: 'UPDATE_GKCLIENT', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * disable
   * the function to disable status1 of a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  disable(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'disable/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = JSON.parse(JSON.stringify(resBody.data));
        console.log(payload);

        return { type: 'DISABLE_GKCLIENT', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * enable
   * the function to enable status1 of a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  enable(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'enable/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = JSON.parse(JSON.stringify(resBody.data));
        console.log(payload);

        return { type: 'ENABLE_GKCLIENT', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * mark
   * the function to mark status2 of a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  mark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'mark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = JSON.parse(JSON.stringify(resBody.data));
      console.log(payload);

      return { type: 'MARK_GKCLIENT', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * unmark
   * the function to unmark status2 of a document
   *
   * @param {string} _id
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  unmark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'unmark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = JSON.parse(JSON.stringify(resBody.data));
      console.log(payload);

      return { type: 'UNMARK_GKCLIENT', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * delete
   * the function to delete a document
   *
   * @param {string} _id
   * @returns {} => ngrx
   * @memberof GkClientService1
   */
  delete(_id: string) {
    return this.httpClientService.delete(this.suffixUrl + _id)
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = {};
      console.log(payload);

      return { type: 'DELETE_GKCLIENT', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * updateRequest
   * the function to update changes of a document request
   *
   * @param {*} gkclient
   * @returns gkClient => ngrx
   * @memberof GkClientService1
   */
  updateRequest(gkclient: any) {
    return this.httpClientService.putCustomized(this.suffixUrl + 'request/' + gkclient._id, gkclient);
    // .map((res) => {
    //   return res.body || {};
    // })
    // .map((resBody) => {
    //   const payload = resBody['data'];
    //   return { type: 'UPDATE_GKCLIENT_REQUEST', payload };
    // })
    // .subscribe((action) => {
    //   this.store.dispatch(action);
    // });
  }

  updateRequestStore(gkclient: any) {
    console.log(gkclient);

    const payload = gkclient;
    this.store.dispatch({ type: 'UPDATE_GKCLIENT_REQUEST', payload });
  }
}
