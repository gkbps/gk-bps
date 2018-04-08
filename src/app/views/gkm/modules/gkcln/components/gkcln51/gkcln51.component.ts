// External
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

// Internal
import { GlobalState } from '../../../../../../global.state';
import {
  SecurityService,
  // TcodeService,
  NavigationService,
  // LocalStorageService,
  // ArrayService,
  HelperService,
  DashboardHelperService
 } from '../../../../../../nga/services';

// For handling data services for dashboard
// import { GkCln51Service } from './gkcln51.service';

// Standard dashboard items are used
import { HDashboardBlankComponent } from '../../../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIComponent } from '../../../../../../nga/components/hDashboardKPI/hDashboardKPI.component';
import { HDashboardChartPDPComponent } from '../../../../../../nga/components/hDashboardChartPDP/hDashboardChartPDP.component';
import { HDashboardChartLineComponent } from '../../../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';
import { HDashboardChartBarComponent } from '../../../../../../nga/components/hDashboardChartBar/hDashboardChartBar.component';
// import { HDashboardChartRadarComponent } from '../../../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.component';
import { HDashboardChartFunnelComponent } from '../../../../../../nga/components/hDashboardChartFunnel/hDashboardChartFunnel.component';

export interface DashboardbItem {
  img: string;
  label: string;
  grid: string;
  component: Function;
  inputs: any;
  outputs: any;
}

@Component({
  selector: 'gkcln-51',
  templateUrl: './gkcln51.html',
  styleUrls: ['./gkcln51.scss'],
})

export class GkCln51Component implements OnInit, OnDestroy {

  myScope = 'gkcln-51';

  DB_COMPONENTS = {
    'HDashboardBlankComponent': HDashboardBlankComponent,
    'HDashboardKPIComponent': HDashboardKPIComponent,
    'HDashboardChartPDPComponent': HDashboardChartPDPComponent,
    'HDashboardChartLineComponent': HDashboardChartLineComponent,
    'HDashboardChartBarComponent': HDashboardChartBarComponent,
    // 'HDashboardChartRadarComponent': HDashboardChartRadarComponent,
    'HDashboardChartFunnelComponent': HDashboardChartFunnelComponent
  };

  title = 'Dashboard';
  prefix = '/gkcln';
  userRights: Array<any>;

  // Mode
  editMode = true;
  illustrationMode = false;

  // Grid
  stdGridList = [];   // Allowed list of grid to adapt the component
  selectedGrid: any;  // Selected grid that adapt the component layout

  // Picklist
  availableDashboardItems: any[];
  selectedDashboardItems: any[];

  // Blank dashboard item
  blankId = 0;
  blankDashboardItem = {
    'id': 0,  // TODO: In edit mode this id must be the sequence of total blank items in dashboard
    'label': 'Blank',
    'icon': 'border_clear',
    'grid': 'ui-g-3',
    'component': 'HDashboardBlankComponent',
    'blank': true
  };

  adaptedDashboardItems: any[];

  constructor(
    private router: Router,
    private globalState: GlobalState,
    // private localStorage: LocalStorageService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    // private tcodeService: TcodeService,
    // private gkCln51Service: GkCln51Service,
    // private arrayService: ArrayService,
    private helperService: HelperService,
    private dashboardHelperService: DashboardHelperService
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.navigationService.trackHistory();

    const currentUser: any = this.securityService.getCurrentUser();
    this.userRights = this.securityService.getMana();

    this.stdGridList = this.dashboardHelperService.getGridList();
    this.selectedGrid = this.stdGridList[0];
    this.selectedDashboardItems = [];

    this.initDashboardItems();
  }

  initDashboardItems() {
    // this.availableDashboardItems = this.gkCln51Service.getDbList()
    const src_status = this.dashboardHelperService.getDataByStatus();
    const ds_active_inactive = this.dashboardHelperService.genDataByActiveInactive(src_status);
    const ds_marked_unmarked = this.dashboardHelperService.genDataByMarkedUnmarked(src_status);
    const ds_composite = this.dashboardHelperService.genDataByComposite(src_status);

    const src_cat_abs = this.dashboardHelperService.getDataByCat();
    const src_cat_rel = this.dashboardHelperService.convertRelativeDataByCat(src_cat_abs);
    const transformed_cat = this.dashboardHelperService.genDataByCatForPDP(src_cat_abs);

    // console.log(transformed_cat);
    // console.log(this.dashboardHelperService.convertRelativeDataByCat(src_cat_abs));
    const ds_cat_abs_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs);
    const ds_cat_rel_line = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel);
    const ds_cat_bar_abs = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_abs, 'bar');
    const ds_cat_bar_rel = this.dashboardHelperService.genDataByCatForLineAndBar(src_cat_rel, 'bar');
    const labelsByMonths = this.dashboardHelperService.genLabelsOnMonths(src_cat_abs[0].data.length);

    const chartList = [
      { label: 'KPI', value: 'kpi' },
      { label: 'PDP Chart', value: 'pdp' },
      { label: 'Line Chart', value: 'line' },
      { label: 'Bar Chart', value: 'bar' },
      { label: 'Radar Chart', value: 'radar' },
      { label: 'Heat Map', value: 'heat' },
      { label: 'Gauge Chart', value: 'gauge' },
      { label: 'Funnel Chart', value: 'Funnel' },
      { label: 'Tree Map', value: 'tree' },
      { label: 'Buble Chart', value: 'bubble' },
      { label: 'Scatter Plot', value: 'scatter' },
      { label: 'Histogram', value: 'histogram' },
      { label: 'Pareto Chart', value: 'pareto' },
      { label: 'Waterfall Chart', value: 'waterfall' },
    ];

    this.availableDashboardItems = [
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
          something: () => 'can really complex'
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
        'id': 'pdp_active_inactive',
        'label': 'Active /Inactive (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'pie',
            labels: ['Active', 'Inactive'],
            datasets: ds_active_inactive
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Active vs. Inactive')
        }
      },
      {
        'id': 'pdp_marked_unmarked',
        'label': 'Marked /Unmarked (PDP)',
        'icon': 'pie_chart_outlined',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPDPComponent',
        'inputs': {
          editMode: this.editMode,
          data: {
            type: 'doughnut',
            labels: ['Marked', 'Unmarked'],
            datasets: ds_marked_unmarked
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Marked vs. Unmarked')
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
            datasets: ds_composite
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Status Composition 1')
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
            datasets: ds_composite
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Status Composition 2')
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
            datasets: transformed_cat.datasets
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Categories Composition 1')
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
            datasets: transformed_cat.datasets
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Categories Composition 2')
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
            datasets: transformed_cat.datasets
          },
          options: this.dashboardHelperService.genStandardOptionsForPDP('Categories Composition 3')
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
            datasets: ds_cat_abs_line
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Movement')
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
            datasets: ds_cat_abs_line
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Stacked Movement (Abs)', 'lineStack')
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
            datasets: ds_cat_rel_line
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('Line Stacked Movement (%)', 'lineStack')
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
            datasets: ds_cat_bar_abs
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Vertical) Bar Movement')
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
            datasets: ds_cat_bar_abs
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Horizontal) Bar Movement')
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
            datasets: ds_cat_bar_abs
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Abs, Vertical) Bar Stacked Movement', 'barStack')
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
            datasets: ds_cat_bar_abs
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Abs, Horizontal) Bar Stacked Movement', 'barStack')
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
            datasets: ds_cat_bar_rel
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(%, Vertical) Bar Stacked Movement', 'barStack')
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
            datasets: ds_cat_bar_rel
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(%, Horizontal) Bar Stacked Movement', 'barStack')
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
                data: this.dashboardHelperService.sumArraysByColumn(src_cat_abs)
              },
              ...this.dashboardHelperService.genDataByCatForMixed(src_cat_abs)
            ]
          },
          options: this.dashboardHelperService.genStandardOptionsForLineAndBar('(Mixed) Line Bar Movement')
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

  selectDashboardItems($event) {
    // console.log($event.items);
    this.adaptedDashboardItems = this.helperService.cloneObject($event.items);
    if ($event.items.length === 1) {
      this.selectedGrid = $event.items[0]['grid'];
    }
  }

  adaptDashboardGrid() {
    if (this.adaptedDashboardItems) {
      for (let i = 0; i < this.adaptedDashboardItems.length; i++) {
        for (let j = 0; j < this.selectedDashboardItems.length; j++) {
          if ((this.adaptedDashboardItems[i].id) === (this.selectedDashboardItems[j].id)) {
            // console.log(this.adaptedDashboardItems[i].id, this.selectedDashboardItems[j].id);
            // console.log(this.selectedGrid);
            if (this.selectedGrid) {
              this.adaptedDashboardItems[i]['grid'] = this.selectedGrid;
              this.selectedDashboardItems[j]['grid'] = this.selectedGrid;
              // console.log(this.adaptedDashboardItems[i]['grid']);
              // console.log(this.selectedDashboardItems[j]['grid']);
            }
            break;
          }
        }
      }
    }
  }

  toggleIllustration() {
    this.illustrationMode = !this.illustrationMode;
  }

  saveDashboard() {
    // console.log(this.selectedDashboardItems);
  }

  addBlankItem() {
    this.blankId = this.blankId + 1;
    const newBlankDashboardItem = JSON.parse(JSON.stringify(this.blankDashboardItem));
    newBlankDashboardItem.id = this.blankId;

    this.selectedDashboardItems.push(newBlankDashboardItem);
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    // Register Language Callback in Global Status
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
