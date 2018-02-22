import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

/**/
import { Store, select } from '@ngrx/store';
import { getRequestsAction } from '../../../ngrx/request/requests.actions';
/**/

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService
} from '../../../nga/services';
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

  requests: Observable<any>;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    public store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    // this.store.dispatch(getRequestsAction('', '{}', 0, 10, 'draft'));
    this.requests = store.pipe(select('requests'));
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', this.trayType);
    // this.subscribeLocalState();
  }

  onPageChange(event) {
    console.log(event);

    this.store.dispatch(getRequestsAction(
      event.filter,
      event.sort,
      event.first,
      event.rows,
      this.trayType
    ));
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    // this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  // subscribeLocalState() {
  //   this.globalState.subscribeEvent('language', this.myScope, (lang) => {
  //     this.translateService.use(lang);
  //   });
  // }
  //
  // unsubscribeLocalState() {
  //   this.globalState.unsubscribeEvent('language', this.myScope);
  // }
}
