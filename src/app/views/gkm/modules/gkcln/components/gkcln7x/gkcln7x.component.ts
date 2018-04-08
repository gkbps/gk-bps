import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SelectItem } from 'primeng/api';

/**/
import { Store, select } from '@ngrx/store';
import { getGkClientReportsDetailAction } from '../../../../../../ngrx/gkClient/gkClients.actions';
/**/

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln7x.component.html',
  styleUrls: ['./gkcln7x.scss']
})
export class GkCln7xComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  module = 'gkcln';
  actionSerial = '6';

  cols: any[];                  // Header columns on the fly
  columnOptions: SelectItem[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';

  gkClientDashboards: Observable<any>;

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
    this.initDataTableColumn();

    this.store.dispatch(getGkClientReportsDetailAction('', '{}', 0, 10));
    this.gkClientDashboards = store.pipe(select('gkClientReportsDetail'));
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.1x.masterList');
    this.subscribeLocalState();
  }

  initDataTableColumn() {
    this.translateService.get(['id', 'description', 'type', 'status', 'marked', 'selected_item_label'])
      .subscribe((res) => {
        this.selectedItemsLabel = res.selected_item_label;

        this.cols = [
          { field: '_id', header: res.id, width: '20%' },
          { field: 'name', header: res.description, width: '40%'  },
          { field: 'type', header: res.type, width: '10%' },
          { field: 'status1', header: res.status, width: '15%'},
          { field: 'status2', header: res.marked, width: '15%' },
        ];

        this.selectedColumns = JSON.parse(JSON.stringify(this.cols));

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
        // console.log(this.cols, this.columnOptions);
      });
  }

  doSomething(event) {
    // console.log(event);

    this.store.dispatch(getGkClientReportsDetailAction(
      event.filter,
      event.sort,
      event.first,
      event.rows
    ));
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
}
