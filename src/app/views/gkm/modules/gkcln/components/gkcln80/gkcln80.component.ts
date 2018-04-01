import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln80Component
* Navigation board for GkCln - 80
*/
@Component({
  selector: 'gkcln-80',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})

export class GkCln80Component extends BaseComponent implements OnInit, OnDestroy {

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
    this.title = 'setting';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '8x',
        'img': this.circleImagePath + '8x.svg',
        'squareImg': this.squareImagePath + '8x.svg',
        'tcode': this.prefix + '8x',
        'title': 'masterList'
      },
      {
        'url': this.prefix + '/' + this.prefix + '81',
        'img': this.circleImagePath + '81.svg',
        'squareImg': this.squareImagePath + '81.svg',
        'tcode': this.prefix + '81',
        'title': 'create'
      },
      {
        'url': this.prefix + '/' + this.prefix + '82',
        'img': this.circleImagePath + '82.svg',
        'squareImg': this.squareImagePath + '82.svg',
        'tcode': this.prefix + '82',
        'title': 'view'
      },
      {
        'url': this.prefix + '/' + this.prefix + '83',
        'img': this.circleImagePath + '83.svg',
        'squareImg': this.squareImagePath + '83.svg',
        'tcode': this.prefix + '83',
        'title': 'edit'
      },
      {
        'url': this.prefix + '/' + this.prefix + '84',
        'img': this.circleImagePath + '84.svg',
        'squareImg': this.squareImagePath + '84.svg',
        'tcode': this.prefix + '84',
        'title': 'disable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '85',
        'img': this.circleImagePath + '85.svg',
        'squareImg': this.squareImagePath + '85.svg',
        'tcode': this.prefix + '85',
        'title': ''
      },
      {
        'url': this.prefix + '/' + this.prefix + '86',
        'img': this.circleImagePath + '86.svg',
        'squareImg': this.squareImagePath + '86.svg',
        'tcode': this.prefix + '86',
        'title': 'enable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '87',
        'img': this.circleImagePath + '87.svg',
        'squareImg': this.squareImagePath + '87.svg',
        'tcode': this.prefix + '87',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '88',
        'img': this.circleImagePath + '88.svg',
        'squareImg': this.squareImagePath + '88.svg',
        'tcode': this.prefix + '88',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '89',
        'img': this.circleImagePath + '89.svg',
        'squareImg': this.squareImagePath + '89.svg',
        'tcode': this.prefix + '89',
        'title': 'delete'
      }
    ];
  }

}
