import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { SecurityService } from '../../../../../../nga/services/security.service';
import { TcodeService } from '../../../../../../nga/services/tcode.service';

import { HelperService } from '../../../../../../nga/services/helpers.service';
import { DashboardHelperService } from '../../../../../../nga/services/dashboard.service';
import { IconsService } from '../../../../../../nga/common/icons.service';

// Standard dashboard items are used
import { HDashboardBlankComponent } from '../../../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIComponent } from '../../../../../../nga/components/hDashboardKPI/hDashboardKPI.component';
import { HDashboardChartPDPComponent } from '../../../../../../nga/components/hDashboardChartPDP/hDashboardChartPDP.component';
import { HDashboardChartLineComponent } from '../../../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';
import { HDashboardChartBarComponent } from '../../../../../../nga/components/hDashboardChartBar/hDashboardChartBar.component';

// Datasource
import { Datasource } from '../../../../../../store/_models/datasource.model';
import { DatasourceService } from '../../../../../../store/_services/datasource.service';

// Dashboard
import { DashboardPage } from '../../../../../../store/_models/dashboard.model';
import { DashboardItem } from '../../../../../../store/_models/dashboard.model';
import { DashboardService } from '../../../../../../store/_services/dashboard.service';

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

  dbItem: any;
  myForm: FormGroup;

  dashboardItemsList: any;
  selectedItem = [];


  // Mode
  editMode = true;

  // Dialog
  dialogTitle = 'Dashboard Item';
  displayDialog = false;
  displayForm = false;

  chartType: any;
  dashboardIcon = '';
  dashboardLabel = '';

  // CHART TYPES
  DB_COMPONENTS = {
    'HDashboardKPIComponent': HDashboardKPIComponent,
    'HDashboardChartPDPComponent': HDashboardChartPDPComponent,
    'HDashboardChartLineComponent': HDashboardChartLineComponent,
    'HDashboardChartBarComponent': HDashboardChartBarComponent
  };

  chartList = [
    { label: 'KPI', value: 'HDashboardKPIComponent' },
    { label: 'PDP', value: 'HDashboardChartPDPComponent' },
    { label: 'Line', value: 'HDashboardChartLineComponent' },
    { label: 'Bar', value: 'HDashboardChartBarComponent' },
  ];
  stdGridList = [];   // Allowed list of grid to adapt the component
  iconList = [];

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
  private datasourceSubscription: Subscription;

  // dashboardPage: Observable<Array<DashboardPage>>;
  // private dashboardPageSubscription: Subscription;

  dashboardItems: Observable<Array<DashboardItem>>;
  private dashboardItemSubscription: Subscription;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private _fb: FormBuilder,
    private helperService: HelperService,
    private dashboardHelperService: DashboardHelperService,
    private datasourceService: DatasourceService,
    private dashboardService: DashboardService,
    private iconsService: IconsService
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.datasource = datasourceService.datasource;
    this.dashboardItems = dashboardService.dashboardItems;

    this.stdGridList = this.dashboardHelperService.getGridList();
    this.iconList = iconsService.getIconsMenu();

    // IMPORTANT: Must pass these in string type to avoid server receiving issues
    const dimensions = ['alpha', 'service', 'status1', 'status2'];
    const measures = [
      '{"value": {"$sum": 1}}',
      '{"count": {"$sum": 1}}'
    ];

    const params = {
      dimensions: dimensions,
      measures: measures
    };
    // ['status1', 'status2'];
    this.datasourceService.getDatasourceByModuleInStore('gkClients', params);

    this.dashboardService.getDashboardItems('gkcln', params)
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.dashboardItemsList = responseBodyData['body'].data;
      }, error => {
        console.log(error);
      });

  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');

    this.subscribeLocalState();
    // this.initList();
    // this.initData();

    this.initBlankModel();
    this.buildForm();
  }

  initBlankModel() {
    this.dbItem =  {
      module: 'gkcln',
      label: 'New dashboard item',
      icon: 'dashboard',
      grid: 'ui-g-6',
      component: '',
      params: {
        dimensions: [],
        measures: []
      }
    };
  }

  buildForm() {
    this.myForm = this._fb.group({
      _id: [{
        value: this.dbItem._id,
        disabled: false
      }],
      module: [ this.dbItem.module, [ Validators.required ]],
      label: [ this.dbItem.label,
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ],
      icon: [ this.dbItem.icon ],
      grid: [ this.dbItem.grid, [ Validators.required ]],
      component: [ this.dbItem.component, [ Validators.required ]],
      params: this._fb.group({
        dimensions: [ this.dbItem.params.dimensions ],
        measures: [ this.dbItem.params.measures ],
      })
    });
  }

  initData() {

    const src_status = this.dashboardHelperService.getDataByStatus();
    const src_cat_abs = this.dashboardHelperService.getDataByCat();
    const src_cat_rel = this.dashboardHelperService.convertRelativeDataByCat(src_cat_abs);
    const transformed_cat = this.dashboardHelperService.genDataByCatForPDP(src_cat_abs);

    // KPI
    this.DATASOURCES.active = src_status.active;
    this.DATASOURCES.inactive = src_status.inactive;
    this.DATASOURCES.marked = src_status.marked;
    this.DATASOURCES.unmarked = src_status.unmarked;

    // PDP
    this.DATASOURCES.status1 = this.dashboardHelperService.genDataByActiveInactive(src_status);
    this.DATASOURCES.status2 = this.dashboardHelperService.genDataByMarkedUnmarked(src_status);
    this.DATASOURCES.status1_status2 = this.dashboardHelperService.genDataByComposite(src_status);

    this.DATASOURCES.cat_abs_pdp = transformed_cat.datasets;
    this.DATASOURCES.cat_rel_pdp = transformed_cat.datasets;

    // LINE
    this.DATASOURCES.cat_abs_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs);
    this.DATASOURCES.cat_rel_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel);

    // BAR
    this.DATASOURCES.cat_abs_bar = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs, 'bar');
    this.DATASOURCES.cat_rel_bar = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel, 'bar');
  }

  initList() {
    // this.availableDashboardItems = this.gkCln51Service.getDbList()

    // Status Dimension
    const src_status = this.dashboardHelperService.getDataByStatus();
    const active = src_status.active;
    const inactive = src_status.inactive;
    const marked = src_status.marked;
    const unmarked = src_status.unmarked;

    const status1 = this.dashboardHelperService.genDataByActiveInactive(src_status);
    const status2 = this.dashboardHelperService.genDataByMarkedUnmarked(src_status);
    const status1_status2 = this.dashboardHelperService.genDataByComposite(src_status);

    const src_cat_abs = this.dashboardHelperService.getDataByCat();
    const src_cat_rel = this.dashboardHelperService.convertRelativeDataByCat(src_cat_abs);
    const transformed_cat = this.dashboardHelperService.genDataByCatForPDP(src_cat_abs);
    const cat_abs_pdp = transformed_cat.datasets;
    // console.log(transformed_cat);
    // console.log(this.dashboardHelperService.convertRelativeDataByCat(src_cat_abs));
    const cat_abs_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs);
    const cat_rel_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel);
    const cat_abs_bar = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs, 'bar');
    const cat_rel_bar = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel, 'bar');
    const labelsByMonths = this.dashboardHelperService.genLabelsOnMonths(src_cat_abs[0].data.length);


  }

  doAction(action) {
    // console.log(action);
    switch (action) {
      case 'new':
        this.displayDialog = true;
        this.displayForm = true;
        break;

      default:
        break;
    }
  }

  cancelDialog() {
    this.displayDialog = false;
    this.displayForm = false;
  }

  selectDashboardItem($event) {
    this.selectedItem = this.helperService.cloneObject($event.value);
    // console.log($event.value, this.selectedItem[0]);
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
    this.datasourceSubscription = this.datasource
    .subscribe(responseBody => {
      // console.log(responseBody);

    }, error => {
      console.log(error);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.datasourceSubscription.unsubscribe();
  }

}


// this.dashboardItemsList = [
//   {
//     'id': 'kpi_active',
//     'module': 'gkcln',
//     'label': 'Active (KPI)',
//     'icon': 'dashboard',
//     'grid': 'ui-g-3',
//     'component': 'HDashboardKPIComponent',
//     'params': {
//       'dimensions': ['Status1'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: { title: 'Active', figure: src_status.active },
//       options: { style: 'overview-box-2', icon: 'layers' },
//       something: () =>'can really complex'
//     },
//     'outputs': { onSomething: (type) => alert(type) }
//   },
//
//
//   {
//     'id': 'pdp_status1',
//     'module': 'gkcln',
//     'label': 'Active /Inactive (PDP)',
//     'icon': 'pie_chart_outlined',
//     'grid': 'ui-g-3',
//     'component': 'HDashboardChartPDPComponent',
//     'params': {
//       'dimensions': ['Status1'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'pie',
//         labels: ['Active', 'Inactive'],
//         datasets: status1
//       },
//       options: this.dashboardHelperService.genStandardOptionsForPDP('Active vs. Inactive')
//     }
//   },
//   {
//     'id': 'pdp_status2',
//     'module': 'gkcln',
//     'label': 'Marked /Unmarked (PDP)',
//     'icon': 'pie_chart_outlined',
//     'grid': 'ui-g-3',
//     'component': 'HDashboardChartPDPComponent',
//     'params': {
//       'dimensions': ['Status1'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'doughnut',
//         labels: ['Marked', 'Unmarked'],
//         datasets: status2
//       },
//       options: this.dashboardHelperService.genStandardOptionsForPDP('Marked vs. Unmarked')
//     }
//   },
//
//   {
//     'id': 'pdp_mixed',
//     'module': 'gkcln',
//     'label': 'Status Composition 2 (PDP)',
//     'icon': 'pie_chart_outlined',
//     'grid': 'ui-g-3',
//     'component': 'HDashboardChartPDPComponent',
//     'params': {
//       'dimensions': ['Status1', 'Status2'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'polarArea',
//         labels: ['Active', 'Inactive', 'Marked', 'Unmarked'],
//         datasets: status1_status2
//       },
//       options: this.dashboardHelperService.genStandardOptionsForPDP('Status Composition 2')
//     }
//   },
//
//   {
//     'id': 'tml_cat',
//     'module': 'gkcln',
//     'label': 'Line Movement',
//     'icon': 'show_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartLineComponent',
//     'params': {
//       'dimensions': ['Industry'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'line',
//         labels: labelsByMonths,
//         datasets: cat_abs_line
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Movement')
//     }
//   },
//   {
//     'id': 'tmls_cat_abs',
//     'module': 'gkcln',
//     'label': 'Line Stacked Movement (Abs)',
//     'icon': 'show_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartLineComponent',
//     'params': {
//       'dimensions': ['Industry'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'line',
//         labels: labelsByMonths,
//         datasets: cat_abs_line
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Stacked Movement (Abs)', 'lineStack')
//     }
//   },
//   {
//     'id': 'tmls_cat_rel',
//     'module': 'gkcln',
//     'label': 'Line Stacked Movement (%)',
//     'icon': 'show_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartLineComponent',
//     'params': {
//       'dimensions': ['Industry'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'line',
//         labels: labelsByMonths,
//         datasets: cat_rel_line
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Stacked Movement (%)', 'lineStack')
//     }
//   },
//   {
//     'id': 'tmvb_cat',
//     'module': 'gkcln',
//     'label': '(Vertical) Bar Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'bar',
//         labels: labelsByMonths,
//         datasets: cat_abs_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Vertical) Bar Movement')
//     }
//   },
//   {
//     'id': 'tmhb_cat',
//     'module': 'gkcln',
//     'label': '(Horizontal) Bar Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'horizontalBar',
//         labels: labelsByMonths,
//         datasets: cat_abs_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Horizontal) Bar Movement')
//     }
//   },
//   {
//     'id': 'tmvbs_cat',
//     'module': 'gkcln',
//     'label': '(Abs, Vertical) Bar Stacked Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'bar',
//         labels: labelsByMonths,
//         datasets: cat_abs_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Abs, Vertical) Bar Stacked Movement', 'barStack')
//     }
//   },
//   {
//     'id': 'tmhbs_cat',
//     'module': 'gkcln',
//     'label': '(Abs, Horizontal) Bar Stacked Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'horizontalBar',
//         labels: labelsByMonths,
//         datasets: cat_abs_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Abs, Horizontal) Bar Stacked Movement', 'barStack')
//     }
//   },
//   {
//     'id': 'tmvbs_cat_rel',
//     'module': 'gkcln',
//     'label': '(%, Vertical) Bar Stacked Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'bar',
//         labels: labelsByMonths,
//         datasets: cat_rel_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(%, Vertical) Bar Stacked Movement', 'barStack')
//     }
//   },
//   {
//     'id': 'tmhbs_cat_rel',
//     'module': 'gkcln',
//     'label': '(%, Horizontal) Bar Stacked Movement',
//     'icon': 'insert_chart',
//     'grid': 'ui-g-6',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'horizontalBar',
//         labels: labelsByMonths,
//         datasets: cat_rel_bar
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(%, Horizontal) Bar Stacked Movement', 'barStack')
//     }
//   },
//
//   {
//     'id': 'tm_cat_complex',
//     'module': 'gkcln',
//     'label': '(Mixed) Line Bar Movement',
//     'icon': 'multiline_chart',
//     'grid': 'ui-g-12',
//     'component': 'HDashboardChartBarComponent',
//     'params': {
//       'dimensions': ['Service'],
//       'measures': ['{"value": {"$sum": 1}}']
//     },
//     'inputs': {
//       editMode: this.editMode,
//       data: {
//         type: 'bar',
//         labels: labelsByMonths,
//         datasets: [
//           {
//             type: 'line',
//             label: 'Total',
//             // borderColor:
//             borderWidth: 2,
//             fill: false,
//             data: this.dashboardHelperService.sumArraysByColumn(src_cat_abs)
//           },
//           ...this.dashboardHelperService.genDataByCatForMixed(src_cat_abs)
//         ]
//       },
//       options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Mixed) Line Bar Movement')
//     }
//   },
//   // {
//   //   'id': 'radar_cat',
//   //   'label': 'Chart - Radar',
//   //   'grid': 'ui-g-6',
//   //   'component': 'HDashboardChartRadarComponent'
//   // },
// ];
