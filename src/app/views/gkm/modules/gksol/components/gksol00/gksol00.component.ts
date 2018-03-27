import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { SecurityService } from '../../../../../../nga/services/security.service';
import { TcodeService } from '../../../../../../nga/services/tcode.service';

import { BaseComponent } from '../../../../../base';

@Component({
  selector: 'gksol-00',
  templateUrl: './gksol00.html',
  styleUrls: ['./gksol00.scss'],
})

export class GkSol00Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gksol-00';

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix = '/gksol';
  public circleImagePath = 'modules/common/circle/';
  public squareImagePath = 'modules/common/square/';

  userRights: Array<any>;

  icon = '';
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
    super(translateService, globalState, localStorageService, menuService, navigationService);
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
    this.translateService.get(['gksol00', 'gksol00Subtitle', 'masterList', 'individual', 'collective', 'dashboard', 'reports'])
      .subscribe((res) => {

        this.title = res.gksol00;
        this.subtitle = res.gksol00Subtitle;

        this.navItems = [
          {
            'url': this.prefix + '/' + this.prefix + '01',
            'img': this.circleImagePath + '01.svg',
            'squareImg': this.squareImagePath + '01.svg',
            'tcode': this.prefix + '01',
            'title': res.masterList
          },
          {
            'url': this.prefix + '/' + this.prefix + '10',
            'img': this.circleImagePath + '10.svg',
            'squareImg': this.squareImagePath + '10.svg',
            'tcode': this.prefix + '10',
            'title': res.individual
          },
          {
            'url': this.prefix + '/' + this.prefix + '20',
            'img': this.circleImagePath + '20.svg',
            'squareImg': this.squareImagePath + '20.svg',
            'tcode': this.prefix + '20',
            'title': res.collective
          },
          {
            'url': this.prefix + '/' + this.prefix + '50',
            'img': this.circleImagePath + '50.svg',
            'squareImg': this.squareImagePath + '50.svg',
            'tcode': this.prefix + '50',
            'title': res.dashboard
          },
          {
            'url': this.prefix + '/' + this.prefix + '60',
            'img': this.circleImagePath + '60.svg',
            'squareImg': this.squareImagePath + '60.svg',
            'tcode': this.prefix + '60',
            'title': res.reports
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
