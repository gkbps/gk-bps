import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln70Component
* Navigation board for GkCln - 70
*/
@Component({
  selector: 'gkcln-70',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})
export class GkCln70Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix = '/gkcln';

  public circleImagePath = 'modules/common/circle/';
  public squareImagePath = 'modules/common/square/';

  title: string;
  navItems: any[];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);
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
    this.title = 'reports';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '7x',
        'img': this.circleImagePath + '7x.svg',
        'squareImg': this.squareImagePath + '7x.svg',
        'tcode': this.prefix + '7x',
        'title': 'masterList'
      },
      {
        'url': this.prefix + '/' + this.prefix + '71',
        'img': this.circleImagePath + '71.svg',
        'squareImg': this.squareImagePath + '71.svg',
        'tcode': this.prefix + '71',
        'title': 'create'
      },
      {
        'url': this.prefix + '/' + this.prefix + '72',
        'img': this.circleImagePath + '72.svg',
        'squareImg': this.squareImagePath + '72.svg',
        'tcode': this.prefix + '72',
        'title': 'view'
      },
      {
        'url': this.prefix + '/' + this.prefix + '73',
        'img': this.circleImagePath + '73.svg',
        'squareImg': this.squareImagePath + '73.svg',
        'tcode': this.prefix + '73',
        'title': 'edit'
      },
      {
        'url': this.prefix + '/' + this.prefix + '74',
        'img': this.circleImagePath + '74.svg',
        'squareImg': this.squareImagePath + '74.svg',
        'tcode': this.prefix + '74',
        'title': 'disable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '75',
        'img': this.circleImagePath + '75.svg',
        'squareImg': this.squareImagePath + '75.svg',
        'tcode': this.prefix + '75',
        'title': 'enable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '76',
        'img': this.circleImagePath + '76.svg',
        'squareImg': this.squareImagePath + '76.svg',
        'tcode': this.prefix + '76',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '77',
        'img': this.circleImagePath + '77.svg',
        'squareImg': this.squareImagePath + '77.svg',
        'tcode': this.prefix + '77',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '78',
        'img': this.circleImagePath + '78.svg',
        'squareImg': this.squareImagePath + '78.svg',
        'tcode': this.prefix + '78',
        'title': 'delete'
      },
      {
        'url': this.prefix + '/' + this.prefix + '79',
        'img': this.circleImagePath + '79.svg',
        'squareImg': this.squareImagePath + '79.svg',
        'tcode': this.prefix + '79',
        'title': 'view_change'
      }
    ];
  }

}
