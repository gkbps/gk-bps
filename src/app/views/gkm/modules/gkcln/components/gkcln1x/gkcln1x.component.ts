import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { getGkClientsAction } from '../../../../../../ngrx/gkClient/gkClients.actions';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln1x.component.html',
  styleUrls: ['./gkcln1x.scss']
})
export class GkCln1xComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  module = 'gkcln';
  actionSerial = '1';

  // Header columns on the fly
  cols: any[];
  columnOptions: SelectItem[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';

  gkClients: Observable<any>;

  listType = false;

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

    // Derive class constructor
    this.store.dispatch(getGkClientsAction('', '{}', 0, 10));
    this.gkClients = store.pipe(select('gkClients'));

    // this.listType = this.localStorageService.getListType();
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.1x.masterList');
    this.subscribeLocalState();

    this.initDataTableColumn();
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
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // COMPONENT OPERATION

  /**
  * @function initDataTableColumn
  * Initilize available Columns for Data table, also support language translation
  */
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

        this.selectedColumns = JSON.parse(JSON.stringify(this.cols));

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
      });
  }

  /**
  * @function doPageChange
  * Receive event from Data Table or Data Grid to perform data refresh request
  */
  doPageChange(event) {
    this.store.dispatch(getGkClientsAction(
      event.filter,
      event.sort,
      event.first,
      event.rows
    ));
  }

}
