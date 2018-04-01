import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

/**
* @module GkCln40Component
* Navigation board for GkCln - 40
*/
@Component({
  selector: 'gkcln-40',
  templateUrl: '../../../../../base/commonHTML/navBoard.html'
})
export class GkCln40Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix: String = '/gkcln';

  public solImagePath: String = 'modules/sol/';
  public tcdImagePath: String = 'modules/tcd/';
  public roleImagePath: String = 'modules/role/';

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
    this.title = 'services';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '41',
        'img': this.solImagePath + 'circle/x1.svg',
        'squareImg': this.solImagePath + 'square/x1.svg',
        'tcode': this.prefix + '41',
        'title': 'solutionsAssignment'
      },
      {
        'url': this.prefix + '/' + this.prefix + '42',
        'img': this.tcdImagePath + 'circle/x2.svg',
        'squareImg': this.tcdImagePath + 'square/x2.svg',
        'tcode': this.prefix + '42',
        'title': 'tcodesAssignment'
      },
      {
        'url': this.prefix + '/' + this.prefix + '43',
        'img': this.roleImagePath + 'circle/x3.svg',
        'squareImg': this.roleImagePath + 'square/x3.svg',
        'tcode': this.prefix + '43',
        'title': 'rolesAssignment'
      },
    ];

  }

}
