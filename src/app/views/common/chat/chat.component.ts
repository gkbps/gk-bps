import { Component, OnInit,  OnDestroy } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  StateManagementService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

@Component({
  templateUrl: 'chat.component.html'
})
export class ChatComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'chat';

  // Override Base class properties
  pageTitle = 'home';
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
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private stateManagementService: StateManagementService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    stateManagementService.initState();
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'chat');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
