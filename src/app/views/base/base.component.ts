import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,
} from '../../nga/services';

@Component({
  selector: 'base-component',
  template: `<p>Base Component</p>`
})
export class BaseComponent implements OnInit, OnDestroy {

  myScope = 'base';

  /* PROPERTIES */
  pageTitle = 'base';
  sidebarMenuJSONFile = 'blank.menu.json';
  globalConfig = {
    language: true,
    trackHistory: false
  };
  sidebarMenuSubscription: Subscription;

  /* CONSTRUCTOR AND LIFECYCLE HOOKS */
  constructor(
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    if (this.globalConfig.language) {
      this.globalState.subscribeEvent('language', this.myScope, (lang) => {
        this.translateService.use(lang);
      });
    }

    if (this.globalConfig.trackHistory) {
      this.navigationService.trackHistory();
    }
  }

  unsubscribeGlobalState() {
    if (this.globalConfig.language) {
      this.globalState.unsubscribeEvent('language', this.myScope);
    }

    if (this.sidebarMenuSubscription) {
      this.sidebarMenuSubscription.unsubscribe();
    }
    // this.globalState.unsubscribeAll();

  }

  /* COMMON FUNCTIONS */
  initSidebarMenu() {
    if (!this.sidebarMenuJSONFile.trim()) { this.sidebarMenuJSONFile = 'blank.menu.json'; }

    // console.log(this.sidebarMenuJSONFile);
    this.sidebarMenuSubscription = this.menuService.getMenuFromJSONFile(this.sidebarMenuJSONFile)
        .subscribe(sidebarMenu => {
          // console.log(sidebarMenu);
          this.globalState.notifyMyDataChanged('sidebarMenu', '', sidebarMenu);
        });
  }

}
