import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

} from '../../../../../../nga/services';
import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: '../gkclnForm/gkUploadFormByTcode.html'
})
export class GkCln24Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  tcode = 'gkcln24';
  module = 'gkClients';

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services

  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }
}
