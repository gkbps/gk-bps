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
  TcodeService,
  NavigationService,
  LocalStorageService,
  ArrayService
 } from '../../../../../../nga/services';

 import {

  GkClnDbChartDoughnut,
  GkClnDbChartPie,
  GkClnDbChartRadar,
  GkClnDbChartPolarArea,
  GkClnDbChartLine
} from '../gkclnDashboard/gkclnDashboard.component';

import { GkCln51Service } from './gkcln51.service';

import { HNewsComponent } from '../../../../../../nga/components/hNews/hNews.component';
import { HDashboardBlankComponent } from '../../../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIActiveComponent } from '../../../../../../nga/components/hDashboardKPIActive/hDashboardKPIActive.component';
import { HDashboardKPIInactiveComponent } from '../../../../../../nga/components/hDashboardKPIInactive/hDashboardKPIInactive.component';
import { HDashboardKPIMarkedComponent } from '../../../../../../nga/components/hDashboardKPIMarked/hDashboardKPIMarked.component';
import { HDashboardKPIUnmarkedComponent } from '../../../../../../nga/components/hDashboardKPIUnmarked/hDashboardKPIUnmarked.component';

import { HDashboardChartDoughnutComponent } from '../../../../../../nga/components/hDashboardChartDoughnut/hDashboardChartDoughnut.component';
import { HDashboardChartPieComponent } from '../../../../../../nga/components/hDashboardChartPie/hDashboardChartPie.component';
import { HDashboardChartRadarComponent } from '../../../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.component';
import { HDashboardChartPolarAreaComponent } from '../../../../../../nga/components/hDashboardChartPolarArea/hDashboardChartPolarArea.component';
import { HDashboardChartLineComponent } from '../../../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';

export interface DashboardbItem {
     img: string;
     label: string;
     grid: string;
     component: Function;
}

@Component({
  selector: 'gkcln-51',
  templateUrl: './gkcln51.html',
  styleUrls: ['./gkcln51.scss'],
  // entryComponents: [
  //   DbGrid3,
  // 	DbGrid4,
  // 	DbGrid5,
  // 	DbGrid6,
  // 	DbGrid7,
  // 	DbGrid8,
  // 	DbGrid9,
  // 	DbGrid12,
  // ]
})

export class GkCln51Component implements OnInit, OnDestroy {

  myScope = 'gkcln-51';

  DB_COMPONENTS = {
    'HNewsComponent': HNewsComponent,
    'HDashboardBlankComponent': HDashboardBlankComponent,
    'HDashboardKPIActiveComponent': HDashboardKPIActiveComponent,
    'HDashboardKPIInactiveComponent': HDashboardKPIInactiveComponent,
    'HDashboardKPIMarkedComponent': HDashboardKPIMarkedComponent,
    'HDashboardKPIUnmarkedComponent': HDashboardKPIUnmarkedComponent,

    'HDashboardChartDoughnutComponent':HDashboardChartDoughnutComponent,
    'HDashboardChartPieComponent': HDashboardChartPieComponent,
    'HDashboardChartRadarComponent': HDashboardChartRadarComponent,
    'HDashboardChartPolarAreaComponent': HDashboardChartPolarAreaComponent,
    'HDashboardChartLineComponent': HDashboardChartLineComponent,

    'GkClnDbChartDoughnut': GkClnDbChartDoughnut,
    'GkClnDbChartPie': GkClnDbChartPie,
    'GkClnDbChartRadar': GkClnDbChartRadar,
    'GkClnDbChartPolarArea': GkClnDbChartPolarArea,
    'GkClnDbChartLine': GkClnDbChartLine
  };

  title = 'Dashboard';
  prefix = '/gkcln';
  userRights: Array<any>;

  // Standard layout
  stdLayoutList = [];
  selectedDashboardGrid: any;

  // Dashboard Page Items
  dbItems: any[];

  availableDashboardItems: any[];
  selectedDashboardItems: any[];

  blankId = 0;
  blankDashboardItem = {
    'id': 0,
    'img': 'ee8a89d8',
    'label': 'Blank',
    'grid': 'ui-g-3',
    'component': 'HDashboardBlankComponent',
    'blank': true
  };

  adaptedDashboardItems: any[];

  inputs: any;
  outputs: any;

  varComponents: any[];

  constructor(
    private router: Router,
    private globalState: GlobalState,
    private localStorage: LocalStorageService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private gkCln51Service: GkCln51Service,
    private arrayService: ArrayService
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.navigationService.trackHistory();

    const currentUser: any = this.securityService.getCurrentUser();
    this.userRights = this.securityService.getMana();

    this.initDashboardPages();
    this.selectedDashboardItems = [];

    this.initDashboardItems();

    this.inputs = {
      hello: 'world',
      something: () => 'can be really complex'
    };

    this.outputs = {
      onSomething: (type) => alert(type)
    };

  }

  initDashboardItems() {
    // this.availableDashboardItems = this.gkCln51Service.getDbList()
    this.availableDashboardItems = [
      {
        'img': 'ee8a89d8',
        'label': 'HNews',
        'grid': 'ui-g-12',
        'component': 'HNewsComponent',
        'blank': true
      },
      {
        'img': 'ee8a89d8',
        'label': 'Active KPI',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIActiveComponent',
        'blank': true
      },
      {
        'img': 'ee8a89d8',
        'label': 'Inactive KPI',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIInactiveComponent',
        'blank': true
      },
      {
        'img': 'ee8a89d8',
        'label': 'Marked KPI',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIMarkedComponent',
        'blank': true
      },
      {
        'img': 'ee8a89d8',
        'label': 'Unmarked KPI',
        'grid': 'ui-g-3',
        'component': 'HDashboardKPIUnmarkedComponent',
        'blank': true
      },

      {
        'img': '39980f34',
        'label': 'New Doughnut',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartDoughnutComponent'
      },
      {
        'img': '39980f34',
        'label': 'New Pie',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPieComponent'
      },
      {
        'img': '39980f34',
        'label': 'New Radar',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartRadarComponent'
      },
      {
        'img': '39980f34',
        'label': 'New Polar Area',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartPolarAreaComponent'
      },
      {
        'img': '39980f34',
        'label': 'New Line',
        'grid': 'ui-g-3',
        'component': 'HDashboardChartLineComponent'
      }
    ];
  }

  initDashboardPages() {

    this.stdLayoutList = [
      {
        label: '3 / 12',
        value: 'ui-g-3'
      },
      {
        label: '4 / 12',
        value: 'ui-g-4'
      },
      {
        label: '5 / 12',
        value: 'ui-g-5'
      },
      {
        label: '6 / 12',
        value: 'ui-g-6'
      },
      {
        label: '7 / 12',
        value: 'ui-g-7'
      },
      {
        label: '8 / 12',
        value: 'ui-g-8'
      },
      {
        label: '9 / 12',
        value: 'ui-g-9'
      },
      {
        label: '12 / 12',
        value: 'ui-g-12'
      },
    ];
    this.selectedDashboardGrid = this.stdLayoutList[0];
  }

  selectDashboardItems($event) {
    // console.log(this.selectedLayout);
    // console.log($event);
    this.adaptedDashboardItems = JSON.parse(JSON.stringify($event.items));
    if ($event.items.length === 1) {
      this.selectedDashboardGrid = $event.items[0]['grid'];
    }
  }

  adaptDashboardGrid() {
    if (this.adaptedDashboardItems) {
      for (let i = 0; i < this.adaptedDashboardItems.length; i++) {
        for (let j = 0; j < this.selectedDashboardItems.length; j++) {
          if (JSON.stringify(this.adaptedDashboardItems[i]) === JSON.stringify(this.selectedDashboardItems[j])) {
            if (this.selectedDashboardGrid) {
                this.adaptedDashboardItems[i]['grid'] = this.selectedDashboardGrid;
                this.selectedDashboardItems[j]['grid'] = this.selectedDashboardGrid;
            }
            break;
          }
        }
      }
    }
  }

  saveDashboard() {
    console.log(this.selectedDashboardItems);
  }

  addBlankItem() {
    this.blankId = this.blankId + 1;
    let newBlankDashboardItem = JSON.parse(JSON.stringify(this.blankDashboardItem));
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
      console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
