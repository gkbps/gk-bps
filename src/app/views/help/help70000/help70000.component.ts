import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { BaseComponent } from '../../base';

@Component({
  selector: 'app-help-70000',
  templateUrl: './help70000.html',
})

export class Help70000Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'help';
  sidebarMenuJSONFile = 'help.menu.json';

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
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
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
