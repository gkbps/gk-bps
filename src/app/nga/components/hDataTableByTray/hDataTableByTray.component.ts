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
  selector: 'h-data-table-by-tray',
  templateUrl: './hDataTableByTray.html',
  styleUrls: ['hDataTableByTray.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HDataTableByTrayComponent implements OnInit, OnDestroy {

  myScope = 'HDataTableByTrayComponent';

  @Input() trayType = '';

  // Header columns on the fly
  cols: any[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';
  columnOptions: SelectItem[];

  @Input() body = [];
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  userRights: string[];

  selectedRequest: any;

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

    this.rows = this.localStorageService.getRows();

    this.initDataTableColumn();
    this.initMenuItems();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.trayType, (lang) => {
      this.translateService.use(lang);
      this.initDataTableColumn();
      this.initMenuItems();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.trayType);
  }

  initDataTableColumn() {
    this.translateService.get(['id', 'description', 'requestor', 'pic', 'status', 'created_at', 'last_update', 'selected_item_label'])
      .subscribe((res) => {
        this.selectedItemsLabel = res.selected_item_label;

        switch (this.trayType) {
          case 'inbox':
          case 'outbox':
            this.cols = [
              { field: '_id', header: res.id, width: '20%' },
              { field: 'desc', header: res.description, width: '40%'  },
              { field: 'requestor.fullname', header: res.requestor, width: '15%' },
              { field: 'status', header: res.status, width: '10%'},
              { field: 'updated_at', header: res.last_update, width: '15%'  },
            ];
            break;
          case 'draft':
          case 'inprogress':
            this.cols = [
              { field: '_id', header: res.id, width: '20%' },
              { field: 'desc', header: res.description, width: '40%'  },
              { field: 'pic.fullname', header: res.pic, width: '15%' },
              { field: 'status', header: res.status, width: '10%'},
              { field: 'updated_at', header: res.last_update, width: '15%'  },
            ];
            break;
          case 'completed':
            this.cols = [
              { field: '_id', header: res.id, width: '20%' },
              { field: 'desc', header: res.description, width: '40%'  },
              { field: 'status', header: res.status, width: '10%'},
              { field: 'created_at', header: res.created_at, width: '15%'  },
              { field: 'updated_at', header: res.last_update, width: '15%'  },
            ];
            break;
        }

        this.selectedColumns = JSON.parse(JSON.stringify(this.cols));


        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }

        // console.log(this.cols, this.columnOptions);
      });
  }

  initMenuItems() {
    this.translateService.get(['view', 'print'])
      .subscribe((res) => {
        this.items = [
          {
            label: res.view, icon: 'ui-icon-search',
            command: (event) => {
              console.log(this.selectedRequest);
              if (this.selectedRequest) {
                this.tcodeService.executeTCode(this.selectedRequest.tcode, this.selectedRequest._id);
              } else {
                alert('Select an item to proceed!');
              }

            },
            disabled: false,
          },
        ];
    });
  }

  viewRequest() {
    if (this.selectedRequest) {
      this.tcodeService.executeTCode(this.selectedRequest.tcode, this.selectedRequest._id);
    } else {
      alert('Select an item to proceed!');
    }
  }

  gotoTcode(tcode) {
    this.tcodeService.executeTCode(tcode);
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
      rows: event.rows,
      tray: this.trayType
    }

    this.rows = event.rows;
    this.localStorageService.setRows(event.rows);

    // IMPORTANT: Event emits to smart component for pagination
    this.onPageChange.emit(pagination);
  }

}
