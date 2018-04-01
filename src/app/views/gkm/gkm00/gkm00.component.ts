import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { BaseComponent } from '../../base';

/**
* @module Gkm00Component
* Navigation board for GKM
*/
@Component({
  selector: 'gkm-00',
  templateUrl: '../../base/commonHTML/navBoard.html'
})
export class Gkm00Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'home';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix: String = '/gkm';

  public orgImagePath: String = 'modules/org/';
  public solImagePath: String = 'modules/sol/';
  public tcdImagePath: String = 'modules/tcd/';

  title: String;
  navItems: any[];

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
    this.globalState.notifyMyDataChanged('help', '', 'tcd.x0.navBoard');

    this.initNavBoard();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

  // COMPONENT OPERATION

  /**
  * @function initNavBoard
  * Initialize title and navItems for Navigation Board
  * NOTE: No need to handle language change as it shall be managed by Navigation Board
  */
  initNavBoard() {
    this.title = 'gkm00';
    this.navItems = [
      {
        'url': '/gkcln/gkcln00',
        'img': this.orgImagePath + 'circle/x1.svg',
        'squareImg': this.orgImagePath + 'square/x1.svg',
        'tcode': 'gkcln00',
        'title': 'gkcln00' // 'GK Clients Management'
      },
      {
        'url': '/gksol/gksol00',
        'img': this.solImagePath + 'circle/x2.svg',
        'squareImg': this.solImagePath + 'square/x2.svg',
        'tcode': 'gksol00',
        'title': 'gksol00' // 'GK Solutions Processing'
      },
      {
        'url': '/gktcd/gktcd00',
        'img': this.tcdImagePath + 'circle/x3.svg',
        'squareImg': this.tcdImagePath + 'square/x3.svg',
        'tcode': 'gktcd00',
        'title': 'gktcd00' // 'GK Tcodes Management'
      },
    ];
  }

}
