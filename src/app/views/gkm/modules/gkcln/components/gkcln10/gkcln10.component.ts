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
  selector: 'gkcln-10',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})

export class GkCln10Component extends BaseComponent implements OnInit, OnDestroy {

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
    this.title = 'individual';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '1x',
        'img': this.circleImagePath + '1x.svg',
        'squareImg': this.squareImagePath + '1x.svg',
        'tcode': this.prefix + '1x',
        'title': 'masterList'
      },
      {
        'url': this.prefix + '/' + this.prefix + '11',
        'img': this.circleImagePath + '11.svg',
        'squareImg': this.squareImagePath + '11.svg',
        'tcode': this.prefix + '11',
        'title': 'create'
      },
      {
        'url': this.prefix + '/' + this.prefix + '12',
        'img': this.circleImagePath + '12.svg',
        'squareImg': this.squareImagePath + '12.svg',
        'tcode': this.prefix + '12',
        'title': 'view'
      },
      {
        'url': this.prefix + '/' + this.prefix + '13',
        'img': this.circleImagePath + '13.svg',
        'squareImg': this.squareImagePath + '13.svg',
        'tcode': this.prefix + '13',
        'title': 'edit'
      },
      {
        'url': this.prefix + '/' + this.prefix + '14',
        'img': this.circleImagePath + '14.svg',
        'squareImg': this.squareImagePath + '14.svg',
        'tcode': this.prefix + '14',
        'title': 'disable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '15',
        'img': this.circleImagePath + '15.svg',
        'squareImg': this.squareImagePath + '15.svg',
        'tcode': this.prefix + '15',
        'title': 'enable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '16',
        'img': this.circleImagePath + '16.svg',
        'squareImg': this.squareImagePath + '16.svg',
        'tcode': this.prefix + '16',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '17',
        'img': this.circleImagePath + '17.svg',
        'squareImg': this.squareImagePath + '17.svg',
        'tcode': this.prefix + '17',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '18',
        'img': this.circleImagePath + '18.svg',
        'squareImg': this.squareImagePath + '18.svg',
        'tcode': this.prefix + '18',
        'title': 'delete'
      },
      {
        'url': this.prefix + '/' + this.prefix + '19',
        'img': this.circleImagePath + '19.svg',
        'squareImg': this.squareImagePath + '19.svg',
        'tcode': this.prefix + '19',
        'title': 'viewChange'
      },
    ];
  }

}
