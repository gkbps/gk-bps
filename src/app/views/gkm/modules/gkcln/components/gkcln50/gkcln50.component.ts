import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln50Component
* Navigation board for GkCln - 50
*/
@Component({
  selector: 'gkcln-50',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})

export class GkCln50Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  prefix: String = '/gkcln';

  public circleImagePath: String = 'modules/common/circle/';
  public squareImagePath: String = 'modules/common/square/';

  title: String;
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
    this.title = 'dashboard';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '5x',
        'img': this.circleImagePath + '5x.svg',
        'squareImg': this.squareImagePath + '5x.svg',
        'tcode': this.prefix + '5x',
        'title': 'masterList'
      },
      {
        'url': this.prefix + '/' + this.prefix + '51',
        'img': this.circleImagePath + '51.svg',
        'squareImg': this.squareImagePath + '51.svg',
        'tcode': this.prefix + '51',
        'title': 'create'
      },
      {
        'url': this.prefix + '/' + this.prefix + '52',
        'img': this.circleImagePath + '52.svg',
        'squareImg': this.squareImagePath + '52.svg',
        'tcode': this.prefix + '52',
        'title': 'view'
      },
      {
        'url': this.prefix + '/' + this.prefix + '53',
        'img': this.circleImagePath + '53.svg',
        'squareImg': this.squareImagePath + '53.svg',
        'tcode': this.prefix + '53',
        'title': 'edit'
      },
      {
        'url': this.prefix + '/' + this.prefix + '54',
        'img': this.circleImagePath + '54.svg',
        'squareImg': this.squareImagePath + '54.svg',
        'tcode': this.prefix + '54',
        'title': 'disable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '55',
        'img': this.circleImagePath + '55.svg',
        'squareImg': this.squareImagePath + '55.svg',
        'tcode': this.prefix + '55',
        'title': 'enable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '56',
        'img': this.circleImagePath + '56.svg',
        'squareImg': this.squareImagePath + '56.svg',
        'tcode': this.prefix + '56',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '57',
        'img': this.circleImagePath + '57.svg',
        'squareImg': this.squareImagePath + '57.svg',
        'tcode': this.prefix + '57',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '58',
        'img': this.circleImagePath + '58.svg',
        'squareImg': this.squareImagePath + '58.svg',
        'tcode': this.prefix + '58',
        'title': 'delete'
      },
      {
        'url': this.prefix + '/' + this.prefix + '59',
        'img': this.circleImagePath + '59.svg',
        'squareImg': this.squareImagePath + '59.svg',
        'tcode': this.prefix + '59',
        'title': 'view_change'
      },
    ];
  }

}
