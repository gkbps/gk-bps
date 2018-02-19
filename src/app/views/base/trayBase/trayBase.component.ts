import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

/**/
// import { Store } from '@ngrx/store';
// import { getRequestsAction } from '../../../ngrx/request/requests.actions';
/**/

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  SecurityService,
  TcodeService,
} from '../../../nga/services';
import { BaseComponent } from '../base.component';

import { GkRequest } from '../../../store/_models/gkRequest.model';
import { GkRequestService } from '../../../store/_services/gkRequest.service';

@Component({
  selector: 'tray-base',
  template: `<p>Tray Base</p>`
})
export class TrayBaseComponent extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'tray';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  trayType = '';  // Also myScope

  cols: any[];                  // Header columns on the fly
  columnOptions: SelectItem[];
  selectedColumns: any[];
  selectedItemsLabel = '{0} items selected';

  requests1: Observable<any>;

  // userRights: string[];

  requests: any[]; // List of requests for Datatable, type: simplified GkRequest[];
  selectedRequest: any; // Type: simplified GkRequest;

  loading: boolean;

  first = 0;
  rows = 10;
  totalRecords: number;
  multiSortMeta: any;

  items: MenuItem[]; // Items of menubar and context menu

  // Redux based variables
  paginatedGkRequests: Observable<Array<GkRequest>>;
  private subscription: Subscription;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    // private store: Store<any>,
    public securityService: SecurityService,
    public tcodeService: TcodeService,
    public gkRequestService: GkRequestService,
  ){
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    this.rows = this.localStorageService.getRows();
    this.paginatedGkRequests = gkRequestService.paginatedGkRequests;

    // this.store.dispatch(getRequestsAction('', '{}', 0, 10));
    // this.requests1 = store.select('requests');
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', this.trayType);
    this.subscribeLocalState();

    // Performance: To avoid multiple read of Mana for menu item disable setting
    // this.userRights = this.securityService.getMana();
    this.initDataTableColumn();
    this.initMenuItems();
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


        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }

        // console.log(this.cols, this.columnOptions);
      });
  }

  // doSomething(event) {
  //   console.log(event);
  //
  //   this.store.dispatch(getRequestsAction(
  //     event.filter,
  //     event.sort,
  //     event.first,
  //     event.rows
  //   ));
  // }

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

  loadData(event: LazyLoadEvent) {

    // Start datatable's loading indicator
    this.loading = true;
    const sort = {};
    if (event.sortField) {
      sort[event.sortField] = event.sortOrder;
    }
    // console.log(sort);

    this.gkRequestService.findMasterListPagination(event.globalFilter, JSON.stringify(sort), event.first, event.rows, this.trayType);
    //this.first = event.first;
    this.rows = event.rows;
    console.log(this.first, this.rows);
    this.localStorageService.setRows(event.rows);
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

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.trayType, (lang) => {
      this.translateService.use(lang);
      this.initDataTableColumn();
      this.initMenuItems();
    });

    // Redux store + initial value
    this.subscription = this.paginatedGkRequests
    .subscribe(responseBody => {
      console.log(responseBody);
      this.totalRecords = responseBody['total'];
      this.requests = responseBody['data'];

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
    this.globalState.unsubscribeEvent('language', this.trayType);
    this.subscription.unsubscribe();
  }

}
