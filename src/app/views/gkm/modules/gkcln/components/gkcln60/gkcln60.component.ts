import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln60Component
* Navigation board for GkCln - 60
*/
@Component({
  selector: 'gkcln-60',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})

export class GkCln60Component extends BaseComponent implements OnInit, OnDestroy {

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
        'url': this.prefix + '/' + this.prefix + '6x',
        'img': this.circleImagePath + '6x.svg',
        'squareImg': this.squareImagePath + '6x.svg',
        'tcode': this.prefix + '6x',
        'title': 'masterList'
      },
      {
        'url': this.prefix + '/' + this.prefix + '61',
        'img': this.circleImagePath + '61.svg',
        'squareImg': this.squareImagePath + '61.svg',
        'tcode': this.prefix + '61',
        'title': 'create'
      },
      {
        'url': this.prefix + '/' + this.prefix + '62',
        'img': this.circleImagePath + '62.svg',
        'squareImg': this.squareImagePath + '62.svg',
        'tcode': this.prefix + '62',
        'title': 'view'
      },
      {
        'url': this.prefix + '/' + this.prefix + '63',
        'img': this.circleImagePath + '63.svg',
        'squareImg': this.squareImagePath + '63.svg',
        'tcode': this.prefix + '63',
        'title': 'edit'
      },
      {
        'url': this.prefix + '/' + this.prefix + '64',
        'img': this.circleImagePath + '64.svg',
        'squareImg': this.squareImagePath + '64.svg',
        'tcode': this.prefix + '64',
        'title': 'disable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '65',
        'img': this.circleImagePath + '65.svg',
        'squareImg': this.squareImagePath + '65.svg',
        'tcode': this.prefix + '65',
        'title': 'enable'
      },
      {
        'url': this.prefix + '/' + this.prefix + '66',
        'img': this.circleImagePath + '66.svg',
        'squareImg': this.squareImagePath + '66.svg',
        'tcode': this.prefix + '66',
        'title': 'mark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '67',
        'img': this.circleImagePath + '67.svg',
        'squareImg': this.squareImagePath + '67.svg',
        'tcode': this.prefix + '67',
        'title': 'unmark'
      },
      {
        'url': this.prefix + '/' + this.prefix + '68',
        'img': this.circleImagePath + '68.svg',
        'squareImg': this.squareImagePath + '68.svg',
        'tcode': this.prefix + '68',
        'title': 'delete'
      },
      {
        'url': this.prefix + '/' + this.prefix + '69',
        'img': this.circleImagePath + '69.svg',
        'squareImg': this.squareImagePath + '69.svg',
        'tcode': this.prefix + '69',
        'title': 'view_change'
      },
    ];
  }

}
