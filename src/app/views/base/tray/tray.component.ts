import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { getRequestsAction } from '../../../ngrx/request/requests.actions';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'tray-base',
  template: `<p>Tray Base</p>`
})
export class TrayBaseComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'tray';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  trayType = ''; // Also myScope
  prefix = '';

  requests: Observable<any>;

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    public store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.requests = store.pipe(select('requests'));
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', this.trayType);
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

  // COMPONENT OPERATION

  /**
  * @function doPageChange
  * Receive event from Data Table or Data Grid to perform data refresh request
  */
  doPageChange(event) {
    this.store.dispatch(getRequestsAction(
      event.filter,
      event.sort,
      event.first,
      event.rows,
      this.trayType,
      this.prefix
    ));
  }

}
