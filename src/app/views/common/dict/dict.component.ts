import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

/**
* @module DictComponent
* Component for Dictionary
*/
@Component({
  selector: 'dict',
  templateUrl: 'dict.component.html',
  styleUrls: ['dict.scss']
})
export class DictComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'dict';

  // Override Base class properties
  pageTitle = 'policy';
  sidebarMenuJSONFile = 'blank.menu.json';
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
    this.globalState.notifyMyDataChanged('help', '', 'dict');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
