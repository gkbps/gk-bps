import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { StateManagementService } from '../../../nga/services/stateManagement.service';

import { BaseComponent } from '../../base';

/**
* @module NewsComponent
* Component for News Page
*/
@Component({
  templateUrl: 'news.component.html'
})
export class NewsComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'news';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true,
  };

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private stateManagementService: StateManagementService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    stateManagementService.initState();
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'news');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
