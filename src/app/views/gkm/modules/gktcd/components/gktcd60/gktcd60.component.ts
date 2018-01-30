import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule, MenuItem } from 'primeng/primeng';

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
  selector: 'gktcd-60',
  templateUrl: './gktcd60.html',
  styleUrls: ['./gktcd60.scss'],
})

export class GkTcd60Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gktcd-60';

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix = '/gktcd';
  public circleImagePath = 'modules/common/circle/';
  public squareImagePath = 'modules/common/square/';

  userRights: Array<any>;

  title: string;
  subtitle: string;

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
    this.subscribeLocalState();
    this.initNavBoard();

    const currentUser: any = this.securityService.getCurrentUser();
    this.userRights = this.securityService.getMana();
  }

  initNavBoard() {
    this.translateService.get(['tcodes', 'reports', 'reportsSubtitle', 'kpis'])
      .subscribe((res) => {

        this.title = res.tcodes + ' - ' + res.reports;
        this.subtitle = res.reportsSubtitle;

        this.navItems = [
          {
            'url': this.prefix + '/' + this.prefix + '61',
            'img': this.circleImagePath + '51.svg',
            'squareImg': this.squareImagePath + '51.svg',
            'tcode': this.prefix + '61',
            'title': 'KPIs'
          },
        ];
      });
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
