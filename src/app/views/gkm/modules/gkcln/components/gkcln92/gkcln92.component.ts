import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { SecurityService } from '../../../../../../nga/services/security.service';
import { TcodeService } from '../../../../../../nga/services/tcode.service';

import { BaseComponent } from '../../../../../base';

import { ApprovalItem } from '../../../../../../store/_models/approvalItem.model';
import { ApprovalItemService } from '../../../../../../store/_services/approvalItem.service';

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

  standardApprovalItems: any;
  approvalItems: Observable<Array<ApprovalItem>>;
  private approvalItemSubscription: Subscription;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private approvalItemService: ApprovalItemService
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
    this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

    // Get Standard List once for all
    this.subscribeLocalState();
    this.approvalItemService.findStandardApprovalItems();
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.approvalItems = this.approvalItemService.standardApprovalItems;
    this.approvalItemSubscription = this.approvalItems
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.standardApprovalItems = responseBodyData['data'];
      }, error => {
        console.log(error);
      });

  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.approvalItemSubscription.unsubscribe();
  }
}
