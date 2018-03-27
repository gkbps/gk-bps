import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

/**/
import { Store, select } from '@ngrx/store';
import { getNotificationAction } from '../../../ngrx/notification/notifications.actions';
/**/

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

/**
* @module NtfctComponent
* Component for a standard notification item
*/
@Component({
  selector: 'ntfct',
  templateUrl: 'ntfct.component.html',
  styleUrls: ['ntfct.scss']
})
export class NtfctComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'ntfct';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  tcode = 'ntfct';
  id: string;

  notificationStore: any;
  notification: any;

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private activatedRoute: ActivatedRoute,
    private security: SecurityService,
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    // Derive class constructor
    this.notificationStore = store.pipe(select('notification'));
    this.notificationStore.subscribe(data => {
      this.notification = data;
      console.log(this.notification);
    });
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'policy');

    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        if (this.id) {
          this.store.dispatch(getNotificationAction(this.id));
        }
      });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
