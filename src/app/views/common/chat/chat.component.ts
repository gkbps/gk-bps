import { Component, OnInit,  OnDestroy } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/api';

import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services';
import { MenuService } from '../../../nga/services';
import { NavigationService } from '../../../nga/services';

import { StateManagementService } from '../../../nga/services';

import { BaseComponent } from '../../base';

/**
* @module ChatComponent
* Component for Chat
*/
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
    this.globalState.notifyMyDataChanged('help', '', 'chat');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
