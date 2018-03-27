import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

@Component({
  selector: 'blank',
  templateUrl: 'blank.component.html',
  styleUrls: ['blank.scss']
})
export class BlankComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'blank';
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
