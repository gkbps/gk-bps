import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

@Component({
  selector: 'debug',
  templateUrl: 'debug.component.html',
  styleUrls: ['debug.scss']
})
export class DebugComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'debug';

  // Override Base class properties
  pageTitle = 'policy';
  sidebarMenuJSONFile = 'blank.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  errors: any;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private security: SecurityService,
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
    this.globalState.notifyMyDataChanged('help', '', 'dict');

    this.errors = JSON.parse(this.localStorageService.getErrors(false));
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
