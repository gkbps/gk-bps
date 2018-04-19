import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { getApprovalItemsAction } from '../../../../../../ngrx/approvalItem/approvalItems.actions';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln92.component.html'
})
export class GkCln92Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  tcode = 'gkcln92';
  tcodes = ['gkcln31', 'gkcln33', 'gkcln34'];

  // Store for request document
  storeApprovalItems: any;
  approvalItems = [];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // STORE
    this.storeApprovalItems = this.store.pipe(select('approvalItems'));

    // PENDING
    this.storeApprovalItems.subscribe(data => {
      // console.log(data);
      if (!data.pending && !data.error) {
        this.approvalItems = Object.assign([], data.data);
      }
    });

    this.storeApprovalItems.dispatch(getApprovalItemsAction());
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

    // Get Standard List once for all
    this.subscribeLocalState();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }
}
