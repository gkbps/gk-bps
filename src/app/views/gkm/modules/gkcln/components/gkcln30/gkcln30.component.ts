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
  selector: 'gkcln-30',
  templateUrl: './gkcln30.html',
  styleUrls: ['./gkcln30.scss'],
})

export class GkCln30Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gkcln-30';

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix: String = '/gkcln';
  public orgImagePath: String = 'modules/org/';
  public docImagePath: String = 'modules/doc/';

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
    this.title = 'processes';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '3x',
        'img': this.orgImagePath + 'circle/3x.svg',
        'squareImg': this.orgImagePath + 'square/3x.svg',
        'tcode': this.prefix + '3x',
        'title': 'request'
      },
      {
        'url': this.prefix + '/' + this.prefix + '31',
        'img': this.orgImagePath + 'circle/31.svg',
        'squareImg': this.orgImagePath + 'square/31.svg',
        'tcode': this.prefix + '31',
        'title': 'new_client'
      },
      {
        'url': this.prefix + '/' + this.prefix + '32',
        'img': this.orgImagePath + 'circle/33.svg',
        'squareImg': this.orgImagePath + 'square/33.svg',
        'tcode': this.prefix + '32',
        'title': 'update_client'
      },
      {
        'url': this.prefix + '/' + this.prefix + '33',
        'img': this.docImagePath + 'dbn/circle/x4.svg',
        'squareImg': this.docImagePath + 'dbn/square/x4.svg',
        'tcode': this.prefix + '33',
        'title': 'debitNote'
      },
      {
        'url': this.prefix + '/' + this.prefix + '34',
        'img': this.docImagePath + 'cdn/circle/x5.svg',
        'squareImg': this.docImagePath + 'cdn/square/x5.svg',
        'tcode': this.prefix + '34',
        'title': 'creditNote'
      },
      {
        'url': this.prefix + '/' + this.prefix + '35',
        'img': this.docImagePath + 'inv/circle/x6.svg',
        'squareImg': this.docImagePath + 'inv/square/x6.svg',
        'tcode': this.prefix + '35',
        'title': 'invoice'
      },
      {
        'url': this.prefix + '/' + this.prefix + '36',
        'img': this.docImagePath + 'rcp/circle/x7.svg',
        'squareImg': this.docImagePath + 'rcp/square/x7.svg',
        'tcode': this.prefix + '36',
        'title': 'receipt'
      },
      {
        'url': this.prefix + '/' + this.prefix + '37',
        'img': this.docImagePath + 'adj/circle/x8.svg',
        'squareImg': this.docImagePath + 'adj/square/x8.svg',
        'tcode': this.prefix + '37',
        'title': 'manualEntry'
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
