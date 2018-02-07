import { Component, OnInit,  OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  StateManagementService,
  ThemeService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

@Component({
  templateUrl: 'about.component.html'
})
export class AboutComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'about';

  // Override Base class properties
  pageTitle = 'about';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private themeService: ThemeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    stateManagementService.initState();
    // themeService.changeStylesheet('mycss1', 'effects/myeffect1');
    // themeService.changeStylesheet('mycss1', 'effects/myeffect2');
    themeService.changeStylesheet('mycss1', 'effects/myeffect3');
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'home');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.themeService.changeStylesheet('mycss1', 'none');
  }

}
