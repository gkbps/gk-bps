import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Header, Footer, MenuItem, SelectItem, LazyLoadEvent } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../../../../nga/services';

import { GkClient } from '../../../../../../store/_models/gkClient.model';
import { GkClientService } from '../../../../../../store/_services/gkClient.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln6x.component.html',
  styleUrls:['./gkcln6x.scss']
})
export class GkCln6xComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  userRights: string[];

  clients: any[];               // List of clients for Datatable, type: simplified GkClient[];
  selectedClient: any;          // Type: simplified GkClient;

  loading: boolean;
  cols: any[];                  // Header columns on the fly
  columnOptions: SelectItem[];
  selectedItemsLabel = '{0} items selected';

  first = 0;
  rows = 10;
  totalRecords: number;
  multiSortMeta: any;

  items: MenuItem[];            // Items of menubar and context menu

  // Redux based variables
  paginatedGkClients: Observable<Array<GkClient>>;
  private subscription: Subscription;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private gkClientService: GkClientService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    this.rows = this.localStorageService.getRows();
    this.paginatedGkClients = gkClientService.paginatedGkClients;
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.6x.masterList');
    this.subscribeLocalState();

    // Performance: To avoid multiple read of Mana for menu item disable setting
    this.userRights = this.securityService.getMana();
    this.initDataTableColumn();
    this.initMenuItems();
  }

  initDataTableColumn() {
    this.translateService.get(['id', 'description', 'db', 'status', 'marked', 'selected_item_label'])
      .subscribe((res) => {
        this.selectedItemsLabel = res.selected_item_label;

        this.cols = [
          { field: '_id', header: res.id, width: '20%' },
          { field: 'name', header: res.description, width: '45%'  },
          { field: 'clientDb', header: res.db, width: '15%'  },
          { field: 'status1', header: res.status, width: '10%'},
          { field: 'status2', header: res.marked, width: '10%' },
        ];

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }

        // console.log(this.cols, this.columnOptions);
      });
  }

  initMenuItems() {
    this.translateService.get(['create', 'view', 'edit', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.create, icon: 'ui-icon-add',
            command: (event) => this.tcodeService.executeTCode('gkcln11'),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln11', this.userRights),
          },
          {
            label: res.view, icon: 'ui-icon-search',
            command: (event) => this.tcodeService.executeTCode('gkcln12', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln12', this.userRights),
          },
          {
            label: res.edit, icon: 'ui-icon-edit',
            command: (event) => this.tcodeService.executeTCode('gkcln13', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln13', this.userRights),
          },
          { separator: true },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.tcodeService.executeTCode('gkcln14', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln14', this.userRights),
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.tcodeService.executeTCode('gkcln15', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln15', this.userRights),
          },
          { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.tcodeService.executeTCode('gkcln16', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln16', this.userRights),
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.tcodeService.executeTCode('gkcln17', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln17', this.userRights),
          },
          { separator: true },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.tcodeService.executeTCode('gkcln18', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln18', this.userRights),
          },
          { separator: true },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => this.tcodeService.executeTCode('gkcln19', this.selectedClient ? this.selectedClient._id : null),
            disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln19', this.userRights),
          },
        ];

      });
  }

  loadData(event: LazyLoadEvent) {

    // Start datatable's loading indicator
    this.loading = true;

    const sort = {};
    if (event.sortField) {
      sort[event.sortField] = event.sortOrder;
    }
    // console.log(sort);

    this.gkClientService.findMasterListPagination(event.globalFilter, JSON.stringify(sort), event.first, event.rows);
    //this.first = event.first;
    this.rows = event.rows;
    console.log(this.first, this.rows);
    this.localStorageService.setRows(event.rows);
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initDataTableColumn();
      this.initMenuItems();
    });

    // Redux store + initial value
    this.subscription = this.paginatedGkClients
    .subscribe(responseBody => {
      this.totalRecords = responseBody['total'];
      this.clients = responseBody['data'];

      // End datatable's loading indicator
      this.loading = false;
    }, error => {
      console.log(error);
    });

    // Initial value of ngrx
    this.loading = true;
    // this.gkClientService.findMasterListPagination('', '{}', this.first, this.rows);
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscription.unsubscribe();
  }
}
