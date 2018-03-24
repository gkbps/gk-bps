import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { SortEvent } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService
} from '../../../../nga/services';

@Component({
  selector: 'notification-table',
  templateUrl: './notification-table.html',
  styleUrls: ['notification-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationTableComponent implements OnInit, OnDestroy {

  myScope = 'notification-table';

  @Input() module = '';
  @Input() body: any;
  @Output() onAction: EventEmitter<any> = new EventEmitter();

  // Header columns on the fly
  cols: any[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';
  columnOptions: SelectItem[];

  selectedClient: any;

  // Pagination
  first = 0;
  rows = 10;
  totalRecords: number;
  multiSortMeta: any;

  // Items of menubar and context menu
  items: MenuItem[];

  constructor(
    private translateService: TranslateService,
    private globalState: GlobalState,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit () {
    this.subscribeLocalState();

    // Performance: To avoid multiple read of Mana for menu item disable setting
    this.rows = this.localStorageService.getRows();

    this.initMenuItems();
    this.initColumns();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initMenuItems();
      this.initColumns();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  initColumns() {
    this.translateService.get(['_id', 'tcode', 'id', 'description', 'username', 'creator', 'mark', 'created_at', 'selected_item_label'])
      .subscribe((res) => {
        this.selectedItemsLabel = res.selected_item_label;
        this.cols = [
          { field: 'desc', header: res.description, width: '80%' },
          { field: 'created_at', header: res.created_at, width: '20%' },
          { field: 'isMark', header: res.mark, width: '10%'  },
          // { field: 'tcode', header: res.tcode, width: '10%' },
          // { field: 'id', header: res.id, width: '10%' },
          // { field: 'username', header: res.username, width: '10%'},
          // { field: 'creator', header: res.creator, width: '10%'  },

        ];

        this.selectedColumns = JSON.parse(JSON.stringify(this.cols));

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
      });
  }

  initMenuItems() {
    this.translateService.get(['open', 'mark', 'unmark', 'delete'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.open, icon: 'ui-icon-search',
            command: (event) => {
              console.log(this.selectedClient.tcode, this.selectedClient.id, this.selectedClient._id);
              this.tcodeService.executeTCode(this.selectedClient.tcode, this.selectedClient.id? this.selectedClient.id : this.selectedClient._id);
            }
          },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.emitAction('mark'),
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.emitAction('unmark'),
          },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.emitAction('delete'),
          },
        ];

      });
  }

  executeTcode(tcode) {
    this.tcodeService.executeTCode(tcode, this.selectedClient ? this.selectedClient._id : null)
  }

  emitAction(action) {
    if (this.isSelected) {
      this.onAction.emit({
        action: action,
        id: this.selectedClient._id
      })
    }
  }

  isSelected() {
    if (this.selectedClient) {
      return true;
    } else {
      return false;
    }
  }

  loadData(event: LazyLoadEvent) {
    // console.log(event);

    const sort = {};
    // sortMode = single
    // if (event.sortField) {
    //   sort[event.sortField] = event.sortOrder;
    // }

    // sortMode = multiple
    if (event.multiSortMeta) {
      for (let i=0; i< event.multiSortMeta.length; i++) {
        sort[event.multiSortMeta[i]['field']] = event.multiSortMeta[i].order;
      }
    }
    // console.log(sort);

    const pagination = {
      filter: event.globalFilter? event.globalFilter: '',
      sort: JSON.stringify(sort),
      first: event.first,
      rows: event.rows
    }

    this.rows = event.rows;
    this.localStorageService.setRows(event.rows);

    // IMPORTANT: Event emits to smart component for pagination
    this.onAction.emit({
      action: 'query',
      pagination: pagination
    });
  }
}
