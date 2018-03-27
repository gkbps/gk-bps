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
  selector: 'gktcd-10',
  templateUrl: './gktcd10.html',
  styleUrls: ['./gktcd10.scss'],
})

export class GkTcd10Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gktcd-10';

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
    this.translateService.get([
      'tcodes', 'individual', 'individualSubtitle',
      'create', 'view', 'edit', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange'
    ])
      .subscribe((res) => {

        this.title = res.tcodes + ' - ' + res.individual;
        this.subtitle = res.individualSubtitle;

        this.navItems = [
          {
            'url': this.prefix + '/' + this.prefix + '11',
            'img': this.circleImagePath + '11.svg',
            'squareImg': this.squareImagePath + '11.svg',
            'tcode': this.prefix + '11',
            'title': res.create
          },
          {
            'url': this.prefix + '/' + this.prefix + '12',
            'img': this.circleImagePath + '12.svg',
            'squareImg': this.squareImagePath + '12.svg',
            'tcode': this.prefix + '12',
            'title': res.view
          },
          {
            'url': this.prefix + '/' + this.prefix + '13',
            'img': this.circleImagePath + '13.svg',
            'squareImg': this.squareImagePath + '13.svg',
            'tcode': this.prefix + '13',
            'title': res.edit
          },
          {
            'url': this.prefix + '/' + this.prefix + '14',
            'img': this.circleImagePath + '14.svg',
            'squareImg': this.squareImagePath + '14.svg',
            'tcode': this.prefix + '14',
            'title': res.disable
          },
          {
            'url': this.prefix + '/' + this.prefix + '15',
            'img': this.circleImagePath + '15.svg',
            'squareImg': this.squareImagePath + '15.svg',
            'tcode': this.prefix + '15',
            'title': res.enable
          },
          {
            'url': this.prefix + '/' + this.prefix + '16',
            'img': this.circleImagePath + '16.svg',
            'squareImg': this.squareImagePath + '16.svg',
            'tcode': this.prefix + '16',
            'title': res.mark
          },
          {
            'url': this.prefix + '/' + this.prefix + '17',
            'img': this.circleImagePath + '17.svg',
            'squareImg': this.squareImagePath + '17.svg',
            'tcode': this.prefix + '17',
            'title': res.unmark
          },
          {
            'url': this.prefix + '/' + this.prefix + '18',
            'img': this.circleImagePath + '18.svg',
            'squareImg': this.squareImagePath + '18.svg',
            'tcode': this.prefix + '18',
            'title': res.delete
          },
          {
            'url': this.prefix + '/' + this.prefix + '19',
            'img': this.circleImagePath + '19.svg',
            'squareImg': this.squareImagePath + '19.svg',
            'tcode': this.prefix + '19',
            'title': res.viewChange
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
