import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../global.state';
import { LocalStorageService } from '../../../../../nga/services';
import { NavigationService } from '../../../../../nga/services';
import { MenuService } from '../../../../../nga/services';
import { SecurityService } from '../../../../../nga/services';
import { TcodeService } from '../../../../../nga/services';

import { GkRequestService } from '../../../../../store/_services/gkRequest.service';
import { BaseComponent } from '../../../../base';

/**
* @module Tray00Component
* Navigation for Requests in different status
*/
@Component({
  selector: 'tray-00',
  templateUrl: './tray00.html',
})

export class Tray00Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'tray00';

  // Override Base class properties
  pageTitle = 'tray';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  prefix = '/gkm';
  public circleImagePath = 'modules/mine/circle/';
  public squareImgPath = 'modules/mine/square/';

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
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.subscribeLocalState();
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

  /**
  * @function initNavBoard
  * Initialize Navigation Board
  */
  initNavBoard() {
    this.title = 'workflows';
    this.subtitle = 'gkm00Subtitle';
    this.navItems = [
      {
        'url': '/inbox',
        'img': this.circleImagePath + 'inbox.svg',
        'squareImg': this.squareImgPath + 'inbox.svg',
        'tcode': 'tray01',
        'title': 'inbox' // 'GK Clients Management'
      },
      {
        'url': '/outbox',
        'img': this.circleImagePath + 'outbox.svg',
        'squareImg': this.squareImgPath + 'outbox.svg',
        'tcode': 'tray02',
        'title': 'outbox' // 'GK Clients Management'
      },
      {
        'url': '/draft',
        'img': this.circleImagePath + 'draft.svg',
        'squareImg': this.squareImgPath + 'draft.svg',
        'tcode': 'tray11',
        'title': 'draft' // 'GK Clients Management'
      },
      {
        'url': '/inprogress',
        'img': this.circleImagePath + 'inProgress.svg',
        'squareImg': this.squareImgPath + 'inProgress.svg',
        'tcode': 'tray12',
        'title': 'inProgress' // 'GK Clients Management'
      },
      {
        'url': '/completed',
        'img': this.circleImagePath + 'finished.svg',
        'squareImg': this.squareImgPath + 'finished.svg',
        'tcode': 'tray13',
        'title': 'completed' // 'GK Clients Management'
      },
    ];

  }
}
