import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln90Component
* Navigation board for GkCln - 90
*/
@Component({
  selector: 'gkcln-90',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})
export class GkCln90Component extends BaseComponent implements OnInit, OnDestroy {

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
    this.title = 'administration';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '91',
        'img': this.circleImagePath + '91.svg',
        'squareImg': this.squareImagePath + '91.svg',
        'tcode': this.prefix + '91',
        'title': 'configuration'
      },
      {
        'url': this.prefix + '/' + this.prefix + '92',
        'img': this.circleImagePath + '92.svg',
        'squareImg': this.squareImagePath + '92.svg',
        'tcode': this.prefix + '92',
        'title': 'approval'
      },
      // {
      //   'url': this.prefix + '/' + this.prefix + '93',
      //   'img': this.circleImagePath + '93.svg',
      //   'squareImg': this.squareImagePath + '93.svg',
      //   'tcode': this.prefix + '93',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '94',
      //   'img': this.circleImagePath + '94.svg',
      //   'squareImg': this.squareImagePath + '94.svg',
      //   'tcode': this.prefix + '94',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '95',
      //   'img': this.circleImagePath + '95.svg',
      //   'squareImg': this.squareImagePath + '95.svg',
      //   'tcode': this.prefix + '95',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '96',
      //   'img': this.circleImagePath + '96.svg',
      //   'squareImg': this.squareImagePath + '96.svg',
      //   'tcode': this.prefix + '96',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '97',
      //   'img': this.circleImagePath + '97.svg',
      //   'squareImg': this.squareImagePath + '97.svg',
      //   'tcode': this.prefix + '97',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '98',
      //   'img': this.circleImagePath + '98.svg',
      //   'squareImg': this.squareImagePath + '98.svg',
      //   'tcode': this.prefix + '98',
      //   'title': ''
      // },
      // {
      //   'url': this.prefix + '/' + this.prefix + '99',
      //   'img': this.circleImagePath + '99.svg',
      //   'squareImg': this.squareImagePath + '99.svg',
      //   'tcode': this.prefix + '99',
      //   'title': ''
      // },
    ];
  }

}
