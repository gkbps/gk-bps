import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { SortEvent } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService
} from '../../../nga/services';

@Component({
  selector: 'h-data-table',
  templateUrl: './hDataTable.html',
  styleUrls: ['hDataTable.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HDataTableComponent implements OnInit, OnDestroy {

  myScope = 'HDataTableComponent';

  @Input() module = '';

  // Header columns on the fly
  @Input() cols: any[];
  @Input() selectedColumns: any[];
  @Input() selectedItemsLabel = '{0} items selected';
  @Input() columnOptions: SelectItem[];

  @Input() body = [];
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  userRights: string[];

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
    this.userRights = this.securityService.getMana();

    this.initMenuItems();
    this.rows = this.localStorageService.getRows();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initMenuItems();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  initMenuItems() {
    this.translateService.get(['create', 'view', 'edit', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.create, icon: 'ui-icon-add',
            command: (event) => this.tcodeService.executeTCode(this.module + '11'),
            disabled: this.notInRights(this.module + '11'),
          },
          {
            label: res.view, icon: 'ui-icon-search',
            command: (event) => this.executeTcode(this.module + '12'),
            disabled: this.notInRights(this.module + '12'),
          },
          {
            label: res.edit, icon: 'ui-icon-edit',
            command: (event) => this.executeTcode(this.module + '13'),
            disabled: this.notInRights(this.module + '13'),
          },
          // { separator: true },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.executeTcode(this.module + '14'),
            disabled: this.notInRights(this.module + '14'),
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.executeTcode(this.module + '15'),
            disabled: this.notInRights(this.module + '15'),
          },
          // { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.executeTcode(this.module + '16'),
            disabled: this.notInRights(this.module + '16'),
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.executeTcode(this.module + '17'),
            disabled: this.notInRights(this.module + '17'),
          },
          // { separator: true },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.executeTcode(this.module + '18'),
            disabled: this.notInRights(this.module + '18'),
          },
          // { separator: true },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => this.executeTcode(this.module + '19'),
            disabled: this.notInRights(this.module + '19'),
          },
        ];

      });
  }

  notInRights(tcode) {
    return !this.tcodeService.checkTcodeInEncodeArray(tcode, this.userRights);
  }

  executeTcode(tcode) {
    this.tcodeService.executeTCode(tcode, this.selectedClient ? this.selectedClient._id : null)
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
    this.onPageChange.emit(pagination);
  }

}