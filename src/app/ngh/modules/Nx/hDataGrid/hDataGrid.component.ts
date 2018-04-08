import {
  Component, OnInit, OnDestroy,
  OnChanges, SimpleChanges,
  Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services/localStorage.service';
import { SecurityService } from '../../../../nga/services/security.service';
import { TcodeService } from '../../../../nga/services/tcode.service';

/**
* @module HDataGridComponent
* Display list of data in Grid format
*/
@Component({
  selector: 'h-data-grid',
  templateUrl: './hDataGrid.html',
  styleUrls: ['hDataGrid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HDataGridComponent implements OnInit, OnDestroy, OnChanges {

  myScope = 'h-data-grid';

  @Input() module = ''; // Prefix
  @Input() actionSerial = ''; // For corresponding toolbar & pop up menu setup

  // Header columns on the fly
  @Input() cols: any[];
  @Input() selectedColumns: any[];
  @Input() selectedItemsLabel = '{0} items selected';
  @Input() columnOptions: SelectItem[];

  @Input() body: any;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  userRights: string[];

  selectedItem: any;

  // Pagination
  first = 0;
  rows = 10;
  totalRecords: number;

  // Items of menubar and context menu
  items: MenuItem[];

  /* DATA GRID
  * - Sorting is single field selected from dropdown
  * - Filter is global and manual based action
  */

  // Sort
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  // Filter
  globalFilter = '';

  constructor(
    private translateService: TranslateService,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService
  ) { }

  ngOnInit () {
    this.subscribeLocalState();

    // Performance: To avoid multiple read of Mana for menu item disable setting
    this.userRights = this.securityService.getMana();

    this.initMenuItems();
    this.rows = this.localStorageService.getRows();

    this.initSortOptions();
    // console.log(this.selectedColumns);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['cols']) {
      this.initSortOptions();
    }
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

  // COMPONENT OPERATION

  /**
  * @function initSortOptions
  * Initialize Sort Options based on available columns
  */
  initSortOptions() {
    this.sortOptions = [];
    this.translateService.get(['asc', 'desc'])
      .subscribe((res) => {
        this.cols.forEach((col) => {
          this.sortOptions.push({ label: col.header + ' (' + res.asc + ')', value: col.field });
          this.sortOptions.push({ label: col.header + ' (' + res.desc + ')', value: '!' + col.field });
        });
      });
  }

  /**
  * @function initMenuItems
  * Initialize Menu Items for splitButton
  * - actionSerial === 1: Full menu includes: Create, View, Edit, Disable, Enable, Mark, Unmark, Delete, ViewChange
  * - actionSerial !== 1: Simplified menu includes: View, Mark, Unmark, Delete
  */
  initMenuItems() {
    switch (this.actionSerial) {
      case '1':
        this.translateService.get(['create', 'view', 'edit', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange'])
          .subscribe((res) => {
            this.items = [
              {
                label: res.create, icon: 'ui-icon-add',
                command: (event) => {
                  // console.log(event);
                  this.tcodeService.executeTcode(this.module + this.actionSerial + '1')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '1'),
              },
              {
                label: res.view, icon: 'ui-icon-search',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '2')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '2'),
              },
              {
                label: res.edit, icon: 'ui-icon-edit',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '3')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '3'),
              },
              {
                label: res.disable, icon: 'ui-icon-bookmark',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '4')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '4'),
              },
              {
                label: res.enable, icon: 'ui-icon-bookmark-border',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '5')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '5'),
              },
              {
                label: res.mark, icon: 'ui-icon-visibility-off',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '6')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '6'),
              },
              {
                label: res.unmark, icon: 'ui-icon-visibility',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '7')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '7'),
              },
              {
                label: res.delete, icon: 'ui-icon-delete-forever',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '8')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '8'),
              },
              {
                label: res.viewChange, icon: 'ui-icon-track-changes',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '9')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '9'),
              },
            ];
        });
        break;

      case '5':
      case '6':
        this.translateService.get(['view', 'mark', 'unmark', 'delete'])
          .subscribe((res) => {
            this.items = [
              {
                label: res.view, icon: 'ui-icon-search',
                command: (event) => {
                  // console.log(event);
                  this.tcodeService.executeTcode(this.module + this.actionSerial + '2', this.selectedItem.id);
                },
                disabled: this.notInRights(this.module + this.actionSerial + '2'),
              },
              {
                label: res.mark, icon: 'ui-icon-visibility-off',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '6')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '6'),
              },
              {
                label: res.unmark, icon: 'ui-icon-visibility',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '7')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '7'),
              },
              {
                label: res.delete, icon: 'ui-icon-delete-forever',
                command: (event) => {
                  // console.log(event);
                  this.executeTcode(this.module + this.actionSerial + '8')
                },
                disabled: this.notInRights(this.module + this.actionSerial + '8'),
              },
            ];
          });
        break;

      default:
        break;
    }
  }

  /**
  * @function notInRights
  * Check if user rights include the tcode
  *
  * @param tcode
  * @return {boolean}
  */
  notInRights(tcode) {
    return !this.tcodeService.checkTcodeInEncodeArray(tcode, this.userRights);
  }

  /**
  * @function executeTcode
  * Execute a Tcode based on selectedItem._id
  *
  * @param tcode
  */
  executeTcode(tcode) {
    this.tcodeService.executeTcode(tcode, this.selectedItem ? this.selectedItem._id : null);
  }

  /**
  * @function chooseItem
  * Assign selectedItem with item choosen
  *
  */
  chooseItem(event, item) {
    this.selectedItem = item;
  }

  /**
  * @function isFullMenu
  * Function to check if toolbar should show 'enable', 'disable', 'viewChange'
  * This is due to actionSerial 1 and 3,
  */
  isFullMenu() {
    return (this.actionSerial === '1');
  }

  /**
  * @function loadData
  * Function to define parameters to emit event
  */
  loadData(event: LazyLoadEvent) {
    this.emitPagination(event.first, event.rows);
  }

  /**
  * @function keyDownFunction
  * Trigger global search once user enter in filter input
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.emitPagination();
    }
  }

  /**
  * @function onSortChange
  * Update sort field and refresh the pagination
  */
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.emitPagination();
  }

  /**
  * @function emitPagination
  * Helper to build pagination and emit to parent component for data refreshing
  */
  emitPagination(first = null, rows = null) {
    const sort = {};

    if (this.sortField) {
      sort[this.sortField] = this.sortOrder;
    }

    this.first = first ? first : this.first;
    this.rows = rows ? rows : this.rows;

    const pagination = {
      filter: this.globalFilter ? this.globalFilter : '',
      sort: JSON.stringify(sort),
      first: this.first,
      rows: this.rows
    };

    if (rows) {
      this.localStorageService.setRows(rows);
    }

    // console.log(pagination);

    // IMPORTANT: Event emits to smart component for pagination
    this.onPageChange.emit(pagination);
  }

}
