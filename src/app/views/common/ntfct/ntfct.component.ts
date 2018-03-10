import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
  selector: 'ntfct',
  templateUrl: 'ntfct.component.html',
  styleUrls: ['ntfct.scss']
})
export class NtfctComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'ntfct';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  tcode = 'ntfct';
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
    this.globalState.notifyMyDataChanged('help', '', 'policy');

    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        console.log(this.id);
      });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
