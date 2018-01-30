import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,
} from '../../../../../../nga/services';
import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: './gkcln19.component.html'
})
export class GkCln19Component extends BaseComponent implements OnInit, OnDestroy {
  
  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  tcode = 'gkcln19';
  module = 'gkclients';
  id: string;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private activatedRoute: ActivatedRoute,
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
    this.globalState.notifyMyDataChanged('help', '', 'tcd.1x.leadingForm');

    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
      });

  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
