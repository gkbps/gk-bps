import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

/**
* @module PolicyComponent
* Component for Policy page
*/
@Component({
  selector: 'policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.scss']
})
export class PolicyComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'policy';
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
    private security: SecurityService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'policy');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
