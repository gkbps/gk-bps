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
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

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
  //
  // // Pagination
  // filter = '';
  // first = 0;
  // rows = 10;
  // totalRecords: number;
  // multiSortMeta: any;

  notification: any;
  // notificationCount = 0;
  // notificationsList = [];
  //
  // selectedNotification: any;
  //
  // // Items of menubar and context menu
  // items: MenuItem[];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private security: SecurityService,
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    this.notification = this.store.pipe(select('notifications1'));
    this.notification.subscribe(res => {
      this.store.dispatch(getTopNotificationsAction('', '{"created_at": -1}', 0, 5));
    })
    // this.store.dispatch(getNotificationsAction('', '{}', 0, 5));
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'policy');

    // this.initMenuItems();
    // this.initColumns();
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

  // initColumns() {
  //   this.translateService.get(['_id', 'tcode', 'id', 'description', 'username', 'creator', 'isMark', 'created_at'])
  //     .subscribe((res) => {
  //       this.selectedItemsLabel = res.selected_item_label;
  //       this.cols = [
  //         // { field: 'tcode', header: res.tcode, width: '10%' },
  //         // { field: 'id', header: res.id, width: '10%' },
  //         { field: 'desc', header: res.description, width: '80%'  },
  //         // { field: 'username', header: res.username, width: '10%'},
  //         // { field: 'creator', header: res.creator, width: '10%'  },
  //         { field: 'isMark', header: res.isMark, width: '10%'  },
  //         { field: 'created_at', header: res.created_at, width: '20%'  },
  //       ];
  //
  //       console.log(this.cols);
  //
  //       this.selectedColumns = JSON.parse(JSON.stringify(this.cols));
  //       console.log(this.selectedColumns);
  //
  //       this.columnOptions = [];
  //       for (let i = 0; i < this.cols.length; i++) {
  //           this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
  //       }
  //       console.log(this.columnOptions);
  //
  //     });
  // }
  //
  // initMenuItems() {
  //   this.translateService.get(['open', 'mark', 'unmark', 'delete'])
  //     .subscribe((res) => {
  //
  //       this.items = [
  //         {
  //           label: res.open, icon: 'ui-icon-add',
  //           // command: (event) => this.tcodeService.executeTcode(this.module + '11'),
  //         },
  //         {
  //           label: res.mark, icon: 'ui-icon-search',
  //           // command: (event) => this.executeTcode(this.module + '12'),
  //         },
  //         {
  //           label: res.delete, icon: 'ui-icon-edit',
  //           // command: (event) => this.executeTcode(this.module + '13'),
  //         }
  //       ];
  //
  //     });
  // }

  // loadData(event: LazyLoadEvent) {
  //   // console.log(event);
  //
  //   const sort = {};
  //   // sortMode = single
  //   // if (event.sortField) {
  //   //   sort[event.sortField] = event.sortOrder;
  //   // }
  //
  //   // sortMode = multiple
  //   if (event.multiSortMeta) {
  //     for (let i=0; i< event.multiSortMeta.length; i++) {
  //       sort[event.multiSortMeta[i]['field']] = event.multiSortMeta[i].order;
  //     }
  //   }
  //   // console.log(sort);
  //
  //   const pagination = {
  //     filter: event.globalFilter? event.globalFilter: '',
  //     sort: JSON.stringify(sort),
  //     first: event.first,
  //     rows: event.rows
  //   }
  //
  //   this.rows = event.rows;
  //   this.localStorageService.setRows(event.rows);
  //
  //   this.store.dispatch(getNotificationsAction(pagination.filter, pagination.sort, pagination.first, pagination.rows));
  // }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      // this.initMenuItems();
      // this.initColumns();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }
}
