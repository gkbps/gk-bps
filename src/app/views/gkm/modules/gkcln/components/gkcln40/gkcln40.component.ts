import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../../../../nga/services';
import { BaseComponent } from '../../../../../base';

@Component({
  selector: 'gkcln-40',
  templateUrl: './gkcln40.html',
  styleUrls: ['./gkcln40.scss'],
})

export class GkCln40Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gkcln-40';

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  prefix: String = '/gkcln';
  public solImagePath: String = 'modules/sol/';
  public tcdImagePath: String = 'modules/tcd/';
  public roleImagePath: String = 'modules/role/';

  userRights: Array<any>;

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
    private router: Router,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.x0.navBoard');
    this.subscribeLocalState();
    this.initNavBoard();

    const currentUser: any = this.securityService.getCurrentUser();
    this.userRights = this.securityService.getMana();
  }

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

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    // Register Language Callback in Global Status
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translateService.use(lang);
      this.initNavBoard();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
