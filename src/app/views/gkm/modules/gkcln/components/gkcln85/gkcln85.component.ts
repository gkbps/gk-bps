import { Component, OnInit, OnDestroy } from '@angular/core';

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
import { HelperService } from '../../../../../../nga/services/helpers.service';
import { DashboardService } from '../../../../../../nga/services/dashboard.service';

// Standard dashboard items are used
import { HDashboardBlankComponent } from '../../../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIComponent } from '../../../../../../nga/components/hDashboardKPI/hDashboardKPI.component';
import { HDashboardChartPDPComponent } from '../../../../../../nga/components/hDashboardChartPDP/hDashboardChartPDP.component';
import { HDashboardChartLineComponent } from '../../../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';
import { HDashboardChartBarComponent } from '../../../../../../nga/components/hDashboardChartBar/hDashboardChartBar.component';

import { Datasource } from '../../../../../../store/_models/datasource.model';
import { DatasourceService } from '../../../../../../store/_services/datasource.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln85.component.html'
})
export class GkCln85Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  tcode = 'gkcln85';


  dashboardItems: any;
  selectedItem= [];

  // Mode
  editMode = true;

  // Dialog
  dialogTitle = "Dashboard Item";
  displayDialog = false;

  chartType: any;
  dashboardIcon = '';
  dashboardLabel = '';

  // CHART TYPES
  DB_COMPONENTS = {
    'HDashboardKPIComponent': HDashboardKPIComponent,
    'HDashboardChartPDPComponent':HDashboardChartPDPComponent,
    'HDashboardChartLineComponent': HDashboardChartLineComponent,
    'HDashboardChartBarComponent': HDashboardChartBarComponent
  }

  chartList = [
    { label: 'KPI', value: 'HDashboardKPIComponent' },
    { label: 'PDP', value: 'HDashboardChartPDPComponent' },
    { label: 'Line', value: 'HDashboardChartLineComponent' },
    { label: 'Bar', value: 'HDashboardChartBarComponent' },
  ];

  // DATA SOURCES
  DATASOURCES = {
    'active': 0,
    'inactive': 0,
    'marked': 0,
    'unmarked': 0,
    'status1': [],
    'status2': [],
    'status1_status2': [],
    'cat_abs_pdp': [],
    'cat_rel_pdp': [],
    'cat_abs_line': [],
    'cat_rel_line': [],
    'cat_abs_bar': [],
    'cat_rel_bar': []
  };

  datasourceByChart = {
    HDashboardKPIComponent: [
      // Status Dimension
      { label: 'active', value: 'active' },
      { label: 'inactive', value: 'inactive' },
      { label: 'marked', value: 'marked' },
      { label: 'unmarked', value: 'unmarked' },
    ],
    HDashboardChartPDPComponent: [
      // Status Dimension
      { label: 'status1', value: 'status1' },
      { label: 'status2', value: 'status2' },
      { label: 'status1_status2', value: 'status1_status2' },

      // Category Dimension
      { label: 'cat_abs_pdp', value: 'cat_abs_pdp' },
      { label: 'cat_rel_pdp', value: 'cat_rel_pdp' }
    ],
    HDashboardChartLineComponent: [
      // Status Dimension

      // Category Dimension
      { label: 'cat_abs_line', value: 'cat_abs_line'},
      { label: 'cat_rel_line', value: 'cat_rel_line' }
    ],
    HDashboardChartBarComponent: [
      // Status Dimension

      // Category Dimension
      { label: 'cat_abs_bar', value: 'cat_abs_bar' },
      { label: 'cat_rel_bar', value: 'cat_rel_bar' }
    ]
  };

  // Redux based variables
  datasource: Observable<Array<Datasource>>;
  private subscription: Subscription;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private helperService: HelperService,
    private dashboardService: DashboardService,
    private datasourceService: DatasourceService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    this.datasource = datasourceService.datasource;

    // IMPORTANT: Must pass these in string type to avoid server receiving issues
    const dimensions = ['alpha', 'service', 'status1', 'status2'];
    const measures = [
      '{"value": {"$sum": 1}}',
      '{"count": {"$sum": 1}}'
    ];

    const params = {
      dimensions: dimensions,
      measures: measures
    }
    // ['status1', 'status2'];
    this.datasourceService.getDatasourceByModule('gkClients', params);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

    this.subscribeLocalState();
    this.initList();
    this.initData();
  }

  initData() {


    const src_status = this.dashboardService.getDataByStatus();
    const src_cat_abs = this.dashboardService.getDataByCat();
    const src_cat_rel = this.dashboardService.convertRelativeDataByCat(src_cat_abs);
    const transformed_cat = this.dashboardService.genDataByCatForPDP(src_cat_abs);

    // KPI
    this.DATASOURCES.active = src_status.active;
    this.DATASOURCES.inactive = src_status.inactive;
    this.DATASOURCES.marked = src_status.marked;
    this.DATASOURCES.unmarked = src_status.unmarked;

    // PDP
    this.DATASOURCES.status1 = this.dashboardService.genDataByActiveInactive(src_status);
    this.DATASOURCES.status2 = this.dashboardService.genDataByMarkedUnmarked(src_status);
    this.DATASOURCES.status1_status2 = this.dashboardService.genDataByComposite(src_status);

    this.DATASOURCES.cat_abs_pdp = transformed_cat.datasets;
    this.DATASOURCES.cat_rel_pdp = transformed_cat.datasets;

    // LINE
    this.DATASOURCES.cat_abs_line = this.dashboardService.genDataByCatForLineAndBar(src_cat_abs);
    this.DATASOURCES.cat_rel_line = this.dashboardService.genDataByCatForLineAndBar(src_cat_rel);

    // BAR
    this.DATASOURCES.cat_abs_bar = this.dashboardService.genDataByCatForLineAndBar(src_cat_abs, 'bar');
    this.DATASOURCES.cat_rel_bar = this.dashboardService.genDataByCatForLineAndBar(src_cat_rel, 'bar');
  }

  initList() {
    // this.availableDashboardItems = this.gkCln51Service.getDbList()

    // Status Dimension
    const src_status = this.dashboardService.getDataByStatus();
    const active = src_status.active;
    const inactive = src_status.inactive;
    const marked = src_status.marked;
    const unmarked = src_status.unmarked;

    const status1 = this.dashboardService.genDataByActiveInactive(src_status);
    const status2 = this.dashboardService.genDataByMarkedUnmarked(src_status);
    const status1_status2 = this.dashboardService.genDataByComposite(src_status);

    const src_cat_abs = this.dashboardService.getDataByCat();
    const src_cat_rel = this.dashboardService.convertRelativeDataByCat(src_cat_abs);
    const transformed_cat = this.dashboardService.genDataByCatForPDP(src_cat_abs);
    const cat_abs_pdp = transformed_cat.datasets;
    // console.log(transformed_cat);
    // console.log(this.dashboardService.convertRelativeDataByCat(src_cat_abs));
    const cat_abs_line = this.dashboardService.genDataByCatForLineAndBar(src_cat_abs);
    const cat_rel_line = this.dashboardService.genDataByCatForLineAndBar(src_cat_rel);
    const cat_abs_bar = this.dashboardService.genDataByCatForLineAndBar(src_cat_abs, 'bar');
    const cat_rel_bar = this.dashboardService.genDataByCatForLineAndBar(src_cat_rel, 'bar');
    const labelsByMonths = this.dashboardService.genLabelsOnMonths(src_cat_abs[0].data.length);

    this.dashboardItems = [
      /*************************************************************************
       * KPI
       *************************************************************************/
      {
        'id': 'kpi_active',
        'label': 'Active (KPI)',
        'icon': 'dashboard',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIComponent',
        'inputs': {
          editMode: this.editMode,
          data: { title: 'Active', figure: src_status.active },
          options: { style: 'overview-box-2', icon: 'layers' },
          something: () =>'can really complex'
        },
        'outputs': { onSomething: (type) => alert(type) }
      },
      {
        'id': 'kpi_inactive',
        'label': 'Inactive (KPI)',
        'icon': 'dashboard',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIComponent',
        'inputs': {
          editMode: this.editMode,
          data: { title: 'Inactive', figure: src_status.inactive },
          options: { style: 'overview-box-1', icon: 'view_module' }
        }
      },
      {
        'id': 'kpi_marked',
        'label': 'Marked (KPI)',
        'icon': 'dashboard',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIComponent',
        'inputs': {
          editMode: this.editMode,
          data: { title: 'Marked', figure: src_status.marked },
          options: { style: 'overview-box-4', icon: 'visibility_off' }
        }
      },
      {
        'id': 'kpi_unmarked',
        'label': 'Unmarked (KPI)',
        'icon': 'dashboard',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIComponent',
        'inputs': {
          editMode: this.editMode,
          data: { title: 'Unmarked', figure: src_status.unmarked },
          options: { style: 'overview-box-3', icon: 'layers_clear' }
        }
      },

      /*************************************************************************
       * CHART - PDP
       *************************************************************************/
      {
        'id': 'pdp_status1',
        'label': 'Active /Inactive (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'pie',
            labels: ['Active', 'Inactive'],
            datasets: status1
          },
          options: this.dashboardService.genStandardOptionsForPDP('Active vs. Inactive')
        }
      },
      {
        'id': 'pdp_status2',
        'label': 'Marked /Unmarked (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'doughnut',
            labels: ['Marked', 'Unmarked'],
            datasets: status2
          },
          options: this.dashboardService.genStandardOptionsForPDP('Marked vs. Unmarked')
        }
      },
      {
        'id': 'pdp_all_status',
        'label': 'Status Composition 1 (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'doughnut',
            labels: ['Active', 'Inactive', 'Marked', 'Unmarked'],
            datasets: status1_status2
          },
          options: this.dashboardService.genStandardOptionsForPDP('Status Composition 1')
        }
      },
      {
        'id': 'pdp_mixed',
        'label': 'Status Composition 2 (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'polarArea',
            labels: ['Active', 'Inactive', 'Marked', 'Unmarked'],
            datasets: status1_status2
          },
          options: this.dashboardService.genStandardOptionsForPDP('Status Composition 2')
        }
      },


      // Composition by categories
      {
        'id': 'pdp_cat1',
        'label': 'Categories 1 (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-4',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'pie',
            labels: transformed_cat.labels,
            datasets: cat_abs_pdp
          },
          options: this.dashboardService.genStandardOptionsForPDP('Categories Composition 1')
        }
      },
      {
        'id': 'pdp_cat2',
        'label': 'Catogories 2 (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-4',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'doughnut',
            labels: transformed_cat.labels,
            datasets: cat_abs_pdp
          },
          options: this.dashboardService.genStandardOptionsForPDP('Categories Composition 2')
        }
      },
      {
        'id': 'pdp_cat3',
        'label': 'Categories 3 (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-4',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'polarArea',
            labels: transformed_cat.labels,
            datasets: cat_abs_pdp
          },
          options: this.dashboardService.genStandardOptionsForPDP('Categories Composition 3')
        }
      },
      /*************************************************************************
       * CHART - LINE | BAR
       *************************************************************************/

      {
        'id': 'tml_cat',
        'label': 'Line Movement',
        'icon': 'show_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartLineComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'line',
            labels: labelsByMonths,
            datasets: cat_abs_line
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('Line Movement')
        }
      },
      {
        'id': 'tmls_cat_abs',
        'label': 'Line Stacked Movement (Abs)',
        'icon': 'show_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartLineComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'line',
            labels: labelsByMonths,
            datasets: cat_abs_line
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('Line Stacked Movement (Abs)', 'lineStack')
        }
      },
      {
        'id': 'tmls_cat_rel',
        'label': 'Line Stacked Movement (%)',
        'icon': 'show_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartLineComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'line',
            labels: labelsByMonths,
            datasets: cat_rel_line
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('Line Stacked Movement (%)', 'lineStack')
        }
      },
      {
        'id': 'tmvb_cat',
        'label': '(Vertical) Bar Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'bar',
            labels: labelsByMonths,
            datasets: cat_abs_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(Vertical) Bar Movement')
        }
      },
      {
        'id': 'tmhb_cat',
        'label': '(Horizontal) Bar Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'horizontalBar',
            labels: labelsByMonths,
            datasets: cat_abs_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(Horizontal) Bar Movement')
        }
      },
      {
        'id': 'tmvbs_cat',
        'label': '(Abs, Vertical) Bar Stacked Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'bar',
            labels: labelsByMonths,
            datasets: cat_abs_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(Abs, Vertical) Bar Stacked Movement', 'barStack')
        }
      },
      {
        'id': 'tmhbs_cat',
        'label': '(Abs, Horizontal) Bar Stacked Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'horizontalBar',
            labels: labelsByMonths,
            datasets: cat_abs_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(Abs, Horizontal) Bar Stacked Movement', 'barStack')
        }
      },
      {
        'id': 'tmvbs_cat_rel',
        'label': '(%, Vertical) Bar Stacked Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'bar',
            labels: labelsByMonths,
            datasets: cat_rel_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(%, Vertical) Bar Stacked Movement', 'barStack')
        }
      },
      {
        'id': 'tmhbs_cat_rel',
        'label': '(%, Horizontal) Bar Stacked Movement',
        'icon': 'insert_chart',
        'grid': 'ui-g-6',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'horizontalBar',
            labels: labelsByMonths,
            datasets: cat_rel_bar
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(%, Horizontal) Bar Stacked Movement', 'barStack')
        }
      },

      {
        'id': 'tm_cat_complex',
        'label': '(Mixed) Line Bar Movement',
        'icon': 'multiline_chart',
        'grid': 'ui-g-12',
        'component': 'HDashboardChartBarComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'bar',
            labels: labelsByMonths,
            datasets: [
              {
                type: 'line',
                label: 'Total',
                // borderColor:
                borderWidth: 2,
                fill: false,
                data: this.dashboardService.sumArraysByColumn(src_cat_abs)
              },
              ...this.dashboardService.genDataByCatForMixed(src_cat_abs)
            ]
          },
          options: this.dashboardService.genStandardOptionsForLineAndBar('(Mixed) Line Bar Movement')
        }
      },
      // {
      //   'id': 'radar_cat',
      //   'label': 'Chart - Radar',
      //   'grid': 'ui-g-6',
      //   'component': 'HDashboardChartRadarComponent'
      // },
    ];
  }

  doAction(action){
    console.log(action);
    switch (action) {
      case 'new':
        this.displayDialog = true;
        break;

      default:
        break;
    }
  }

  cancelDialog() {
    this.displayDialog = false;
  }

  selectDashboardItem($event) {
    this.selectedItem = this.helperService.cloneObject($event.value);
    console.log($event.value, this.selectedItem[0]);
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
    });

    // Redux store + initial value
    this.subscription = this.datasource
    .subscribe(responseBody => {
      console.log(responseBody);

    }, error => {
      console.log(error);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscription.unsubscribe();
  }

}
