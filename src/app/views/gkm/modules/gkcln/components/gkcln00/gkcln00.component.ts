import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

@Component({
  selector: 'gkcln-00',
  templateUrl: './gkcln00.html',
  styleUrls: ['./gkcln00.scss'],
})

export class GkCln00Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  prefix: String = '/gkcln';

  public circleImagePath: String = 'modules/common/circle/';
  public squareImagePath: String = 'modules/common/square/';
  public orgImagePath: String = 'modules/org/';

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

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.x0.navBoard');
    this.navigationService.trackHistory();
    this.initNavBoard();
  }

  initNavBoard() {
    this.title = 'client';
    this.navItems = [
      {
        'url': this.prefix + '/' + this.prefix + '10',
        'img': this.circleImagePath + '10.svg',
        'squareImg': this.squareImagePath + '10.svg',
        'tcode': this.prefix + '10',
        'title': 'individual'
      },
      {
        'url': this.prefix + '/' + this.prefix + '20',
        'img': this.circleImagePath + '20.svg',
        'squareImg': this.squareImagePath + '20.svg',
        'tcode': this.prefix + '20',
        'title': 'collective'
      },
      {
        'url': this.prefix + '/' + this.prefix + '30',
        'img': this.circleImagePath + '30.svg',
        'squareImg': this.squareImagePath + '30.svg',
        'tcode': this.prefix + '30',
        'title': 'requests'
      },
      {
        'url': this.prefix + '/' + this.prefix + '40',
        'img': this.circleImagePath + '40.svg',
        'squareImg': this.squareImagePath + '40.svg',
        'tcode': this.prefix + '40',
        'title': 'gkcln40'
      },
      {
        'url': this.prefix + '/' + this.prefix + '50',
        'img': this.circleImagePath + '50.svg',
        'squareImg': this.squareImagePath + '50.svg',
        'tcode': this.prefix + '50',
        'title': 'dashboard'
      },
      {
        'url': this.prefix + '/' + this.prefix + '60',
        'img': this.circleImagePath + '60.svg',
        'squareImg': this.squareImagePath + '60.svg',
        'tcode': this.prefix + '60',
        'title': 'summary_reports'
      },
      {
        'url': this.prefix + '/' + this.prefix + '70',
        'img': this.circleImagePath + '70.svg',
        'squareImg': this.squareImagePath + '70.svg',
        'tcode': this.prefix + '70',
        'title': 'detail_reports'
      },
      {
        'url': this.prefix + '/' + this.prefix + '80',
        'img': this.circleImagePath + '80.svg',
        'squareImg': this.squareImagePath + '80.svg',
        'tcode': this.prefix + '80',
        'title': 'settings'
      },
      {
        'url': this.prefix + '/' + this.prefix + '90',
        'img': this.circleImagePath + '90.svg',
        'squareImg': this.squareImagePath + '90.svg',
        'tcode': this.prefix + '90',
        'title': 'administration'
      },
    ];

  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
