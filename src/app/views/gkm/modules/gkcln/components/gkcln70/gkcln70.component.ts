// External
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
  selector: 'gkcln-70',
  templateUrl: './gkcln70.html',
  styleUrls: ['./gkcln70.scss'],
})

export class GkCln70Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gkcln-70';

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

  userRights: Array<any>;

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
