import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Header, Footer, MenuItem, SelectItem, LazyLoadEvent } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../../../nga/services';
import { GkRequestService } from '../../../../../store/_services/gkRequest.service';
import { BaseComponent } from '../../../../base';

@Component({
  selector: 'tray-00',
  templateUrl: './tray00.html',
})

export class Tray00Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'tray00';

  // Override Base class properties
  pageTitle = 'tray';
  sidebarMenuJSONFile = 'mine.menu.json';
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
    super(translateService, globalState, localStorageService, navigationService, menuService);

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

  initNavBoard() {
    this.title = 'workflows';
    this.subtitle = 'gkm00Subtitle';
    this.navItems = [
      {
        'url': '/tray/tray01',
        'img': this.circleImagePath + 'inbox.svg',
        'squareImg': this.squareImgPath + 'inbox.svg',
        'tcode': 'tray01',
        'title': 'inbox' // 'GK Clients Management'
      },
      {
        'url': '/tray/tray02',
        'img': this.circleImagePath + 'outbox.svg',
        'squareImg': this.squareImgPath + 'outbox.svg',
        'tcode': 'tray02',
        'title': 'outbox' // 'GK Clients Management'
      },
      {
        'url': '/tray/tray11',
        'img': this.circleImagePath + 'draft.svg',
        'squareImg': this.squareImgPath + 'draft.svg',
        'tcode': 'tray11',
        'title': 'draft' // 'GK Clients Management'
      },
      {
        'url': '/tray/tray12',
        'img': this.circleImagePath + 'inProgress.svg',
        'squareImg': this.squareImgPath + 'inProgress.svg',
        'tcode': 'tray12',
        'title': 'inProgress' // 'GK Clients Management'
      },
      {
        'url': '/tray/tray13',
        'img': this.circleImagePath + 'finished.svg',
        'squareImg': this.squareImgPath + 'finished.svg',
        'tcode': 'tray13',
        'title': 'completed' // 'GK Clients Management'
      },      
    ];

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

}
