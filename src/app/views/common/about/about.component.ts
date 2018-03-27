import { Component, OnInit,  OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { ThemeService } from '../../../nga/services/theme.service';

import { BaseComponent } from '../../base';

/**
* @module AboutComponent
* Component introduces the Author
*/
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
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private themeService: ThemeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

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
