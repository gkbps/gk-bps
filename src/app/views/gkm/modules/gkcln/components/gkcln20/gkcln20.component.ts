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
  selector: 'gkcln-20',
  templateUrl: './gkcln20.html',
  styleUrls: ['./gkcln20.scss'],
})

export class GkCln20Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gkcln-20';

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

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

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* GLOBAL STATE */
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
