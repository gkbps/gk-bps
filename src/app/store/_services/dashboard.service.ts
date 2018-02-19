import { Injectable } from '@angular/core';
import { HttpClientService } from '../../nga/services/';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { DashboardPage } from '../_models/dashboard.model';
import { DashboardItem } from '../_models/dashboard.model';

@Injectable()
export class DashboardService {

  // Redux based variables
  paginatedDashboardPages: Observable<Array<DashboardPage>>;    // List of dashboard pages by modules
  selectedDashboardPage: Observable<DashboardPage>;             // Selected dashboard page of particular module for data opertion

  dashboardItems: Observable<Array<DashboardItem>>;             // List of dashboard items for creation of a dashboard page
  selectedDashboardItem: Observable<DashboardItem>;             // Selected dashboard item for customization

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    // Dashboard pages store
    this.paginatedDashboardPages = store.select( myStore => myStore.paginatedDashboardPages );
    this.selectedDashboardPage = store.select( myStore => myStore.selectedDashboardPage );

    // Dashboard items store
    this.dashboardItems = store.select( myStore => myStore.dashboardItems );
    this.selectedDashboardItem = store.select( myStore => myStore.selectedDashboardItem );
  }

  getPaginatedDashboardPages(module: string, params) {
    /***
     * Example
       params = {
         filter: filter,
         sort: sort,
         first: first,
         rows: rows
       }
     */
    const reqOptions = {
      params: params
    };

    return this.httpClientService.get('/dashboard/pages/' + module, reqOptions);
  }

  getPaginatedDashboardPagesInStore(module: string, params) {
    /***
     * Example
       params = {
         filter: filter,
         sort: sort,
         first: first,
         rows: rows
       }
     */
    const reqOptions = {
      params: params
    };

    return this.httpClientService.get('/dashboard/pages/' + module, reqOptions)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'GET_DASHBOARD_PAGES', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  getDashboardItems(module: string, params) {
    const reqOptions = {
      params: params
    };

    return this.httpClientService.get('/dashboard/items/' + module, reqOptions);
  }

  getDashboardItemsInStore(module: string, params) {
    const reqOptions = {
      params: params
    };

    return this.httpClientService.get('/dashboard/items/' + module, reqOptions)
      .map((res) => {
        return res.body || {};
      })
      .map((payload) => {
        return { type: 'GET_DASHBOARD_ITEMS', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }




}
