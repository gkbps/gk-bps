import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { SortEvent } from 'primeng/api';

import { Store, select } from '@ngrx/store';
import {
  getTopNotificationsAction,

  getNotificationsAction,
  markNotificationAction,
  unmarkNotificationAction,
  deleteNotificationAction,
  getNotificationAction
} from '../../../ngrx/notification/notifications.actions';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

/**
* @module NotificationComponent
* Component for Notification page
*/
@Component({
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'notification';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  module = 'gkcln';

  // Header columns on the fly
  cols: any[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';
  columnOptions: SelectItem[];

  notification: any;

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private security: SecurityService,
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.notification = this.store.pipe(select('notifications'));
    this.notification.subscribe(res => {
      this.store.dispatch(getTopNotificationsAction('', '{"created_at": -1}', 0, 5));
    });
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'policy');
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

  doSomething(event) {
    // console.log(event);

    switch (event.action) {
      case 'query':
        this.store.dispatch(getNotificationsAction(
          event.pagination.filter,
          event.pagination.sort,
          event.pagination.first,
          event.pagination.rows
        ));
        break;

      case 'mark':
        this.store.dispatch(markNotificationAction(event.id));
        break;

      case 'unmark':
        this.store.dispatch(unmarkNotificationAction(event.id));
        break;

      case 'delete':
        this.store.dispatch(deleteNotificationAction(event.id));
        break;
    }

  }
}
