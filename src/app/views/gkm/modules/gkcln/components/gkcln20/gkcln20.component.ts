import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln20Component
* Navigation board for GkCln - 20: Collective
*/
@Component({
  selector: 'gkcln-20',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})
export class GkCln20Component extends BaseComponent implements OnInit, OnDestroy {

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
    this.title = 'collective';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '21',
        'img': this.circleImagePath + '21.svg',
        'squareImg': this.squareImagePath + '21.svg',
        'tcode': this.prefix + '21',
        'title': 'upload'
      },
      {
        'url': this.prefix + '/' + this.prefix + '22',
        'img': this.circleImagePath + '22.svg',
        'squareImg': this.squareImagePath + '22.svg',
        'tcode': this.prefix + '22',
        'title': 'download'
      },
      {
        'url': this.prefix + '/' + this.prefix + '23',
        'img': this.circleImagePath + '23.svg',
        'squareImg': this.squareImagePath + '23.svg',
        'tcode': this.prefix + '23',
        'title': 'upsert'
      },
      {
        'url': this.prefix + '/' + this.prefix + '24',
        'img': this.circleImagePath + '24.svg',
        'squareImg': this.squareImagePath + '24.svg',
        'tcode': this.prefix + '24',
        'title': 'inactivate'
      },
      {
        'url': this.prefix + '/' + this.prefix + '25',
        'img': this.circleImagePath + '25.svg',
        'squareImg': this.squareImagePath + '25.svg',
        'tcode': this.prefix + '25',
        'title': 'activate'
      },
      {
        'url': this.prefix + '/' + this.prefix + '26',
        'img': this.circleImagePath + '26.svg',
        'squareImg': this.squareImagePath + '26.svg',
        'tcode': this.prefix + '26',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '27',
        'img': this.circleImagePath + '27.svg',
        'squareImg': this.squareImagePath + '27.svg',
        'tcode': this.prefix + '27',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '28',
        'img': this.circleImagePath + '28.svg',
        'squareImg': this.squareImagePath + '28.svg',
        'tcode': this.prefix + '28',
        'title': 'clean'
      },
      {
        'url': this.prefix + '/' + this.prefix + '29',
        'img': this.circleImagePath + '29.svg',
        'squareImg': this.squareImagePath + '29.svg',
        'tcode': this.prefix + '29',
        'title': 'history'
      },
    ];
  }

}
