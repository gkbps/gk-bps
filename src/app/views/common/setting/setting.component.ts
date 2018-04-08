import { Component, OnInit,  OnDestroy } from '@angular/core';

// Internal
import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { ThemeService } from '../../../nga/services/theme.service';

import { BaseComponent } from '../../base';

import { Setting } from './timezone';

/**
* @module SettingComponent
* Component for setting page
*/
@Component({
  templateUrl: 'setting.component.html'
})
export class SettingComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'setting';

  // Override Base class properties
  pageTitle = 'Setting';
  sidebarMenuJSONFile = 'setting.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  menu: any[];

  favTopPosition: boolean;

  localeList: any[];

  langList: any[];

  styleList = [
    { label: 'Modern', value: true },
    { label: 'Classic', value: false }
  ];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private themeService: ThemeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    stateManagementService.initState();

  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeLocalState();

    // Derive class initialization
    // Do not initialize Sidebar Menu as this is in page generation
    // this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'setting');

    // Refresh sidebar menu to update Fav menu position
    this.menu = this.initMenu();
    this.refreshSidebarMenu();
    // this.globalState.notifyDataChanged('sidebarMenu', this.menu);

    // Reinstate user preference
    this.favTopPosition = this.localStorageService.getFavPosition();

    // Init sample components
    this.initLocaleList();
    this.initLangList();
  }

  initLocaleList() {
    this.localeList = Setting.timezone.map((d, i) => {
      return {
        label: d.text,
        value: d.abbr
      }
    });
  }

  initLangList() {
    this.translateService.get([
      'langEnglish',
      'langVietnamese',
      'langJapanese',
      'langKorean',
      'langChinese',
      'langFrench'
    ])
      .subscribe((res) => {
        this.langList = [
          { label: res.langEnglish, value: 'en' },
          { label: res.langVietnamese, value: 'vn' },
          { label: res.langJapanese, value: 'jp' },
          { label: res.langKorean, value: 'kr' },
          { label: res.langChinese, value: 'ch' },
          { label: res.langFrench, value: 'fr' }
        ];
        // console.log(this.langList);
      });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initLangList();
    });
  }

  initMenu() {
    return [
      { data: { label: 'backToMain', icon: 'dashboard', url: '/home' } },
      {
        data: {label: 'preference', icon: 'format_color_fill'},
        children: [
          {
            data:
              {
                label: 'fav_position', icon: 'favorite',
                command: (event) => {

                }
              }
            },
            {
              data:
              {
                label: 'debug_toggle', icon: 'bug_report',
                command: (event) => {
                }
              }
            },
        ]
      }
    ];
  }

  refreshSidebarMenu(toggle: boolean = false) {
    const fav = this.localStorageService.getFav();
    const currentPosition = this.localStorageService.getFavPosition();
    this.favTopPosition = toggle ? !currentPosition : currentPosition;
    // console.log(this.favTopPosition);

    if (this.favTopPosition) {
      fav.push(...this.menu);
      // console.log(fav);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', fav);
    } else {
      const changedMenu = [...this.menu, ...fav];
      // console.log(changedMenu);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', changedMenu);
    }

    this.localStorageService.setFavPosition(this.favTopPosition);
  }

}
