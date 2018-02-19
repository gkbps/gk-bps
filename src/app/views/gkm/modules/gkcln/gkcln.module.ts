// External
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*******************************************************************************
 * NGRX STORE RELATED IMPORTATION
 *******************************************************************************/
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { paginatedGkRequests, selectedGkRequest } from '../../../../store/_reducers/gkRequest.reducer';
// gkRequests,
import { paginatedGkClients, gkClients, selectedGkClient } from '../../../../store/_reducers/gkClient.reducer';
import { paginatedGkClientsDashboard, selectedGkClientDashboard } from '../../../../store/_reducers/gkClient.reducer';
import { paginatedDashboardPages, selectedDashboardPage, dashboardItems, selectedDashboardItem } from '../../../../store/_reducers/dashboard.reducer';

import { apiGkUsers } from '../../../../store/_reducers/gkUser.reducer';
import { standardApprovalItems } from '../../../../store/_reducers/approvalItem.reducer';
import { datasource } from '../../../../store/_reducers/datasource.reducer';
import { requestFiles } from '../../../../store/_reducers/requestFile.reducer';

import { GkUserService } from '../../../../store/_services/gkUser.service';
import { GkClientService } from '../../../../store/_services/gkClient.service';
import { GkRequestService } from '../../../../store/_services/gkRequest.service';
import { ApprovalItemService } from '../../../../store/_services/approvalItem.service';
import { DatasourceService } from '../../../../store/_services/datasource.service';
import { RequestFileService } from '../../../../store/_services/requestFile.service';
import { DashboardService } from '../../../../store/_services/dashboard.service';
// Internal
import { NgaModule } from '../../../../nga/nga.module';

import { GkClnComponent } from './gkcln.component';
import { GkClnRoutingModule } from './gkcln-routing.module';

// import { GkCln51Service } from './components/gkcln51/gkcln51.service';

/*******************************************************************************
 * DASHBOARD RELATED IMPORTATION
 *******************************************************************************/
import { DynamicModule } from 'ng-dynamic-component';
import { HDashboardBlankModule } from '../../../../nga/components/hDashboardBlank/hDashboardBlank.module';
import { HDashboardKPIModule } from '../../../../nga/components/hDashboardKPI/hDashboardKPI.module';
import { HDashboardChartPDPModule } from '../../../../nga/components/hDashboardChartPDP/hDashboardChartPDP.module';
import { HDashboardChartLineModule } from '../../../../nga/components/hDashboardChartLine/hDashboardChartLine.module';
import { HDashboardChartBarModule } from '../../../../nga/components/hDashboardChartBar/hDashboardChartBar.module';
// import { HDashboardChartRadarModule } from '../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.module';
// import { HDashboardChartFunnelModule } from '../../../../nga/components/hDashboardChartFunnel/hDashboardChartFunnel.module';
const DB_MODULES = [
	HDashboardBlankModule,
	HDashboardKPIModule,
	HDashboardChartPDPModule,
	HDashboardChartBarModule,
	HDashboardChartLineModule,
	// HDashboardChartRadarModule,
	// HDashboardChartFunnelModule
];

import { HDashboardBlankComponent } from '../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIComponent } from '../../../../nga/components/hDashboardKPI//hDashboardKPI.component';
import { HDashboardChartPDPComponent } from '../../../../nga/components/hDashboardChartPDP/hDashboardChartPDP.component';
import { HDashboardChartLineComponent } from '../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';
import { HDashboardChartBarComponent } from '../../../../nga/components/hDashboardChartBar/hDashboardChartBar.component';
// import { HDashboardChartRadarComponent } from '../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.component';
// import { HDashboardChartFunnelComponent } from '../../../../nga/components/hDashboardChartFunnel/hDashboardChartFunnel.component';
const DB_COMPONENTS = [
	HDashboardBlankComponent,
	HDashboardKPIComponent,
	HDashboardChartPDPComponent,
	HDashboardChartLineComponent,
	HDashboardChartBarComponent,
	// HDashboardChartRadarComponent,
	// HDashboardChartFunnelComponent
];
/*******************************************************************************/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

		StoreModule.forRoot({

      // Dashboard
			paginatedDashboardPages: paginatedDashboardPages,
			selectedDashboardPage: selectedDashboardPage,
			dashboardItems: dashboardItems,
			selectedDashboardItem: selectedDashboardItem,

      // Requests
			paginatedGkRequests: paginatedGkRequests,
		  // gkRequests: gkRequests,
		  selectedGkRequest: selectedGkRequest,

      // GkClients
		  paginatedGkClients: paginatedGkClients,
		  gkClients: gkClients,
		  selectedGkClient: selectedGkClient,

      // Dashboard
			paginatedGkClientsDashboard: paginatedGkClientsDashboard,
			selectedGkClientDashboard: selectedGkClientDashboard,

			// Properties
			standardApprovalItems: standardApprovalItems,
			datasource: datasource,

			requestFiles: requestFiles,

			// User list for facilitating request
			apiGkUsers: apiGkUsers,

		}),
		StoreDevtoolsModule.instrument(),

    NgaModule,

		GkClnRoutingModule,

		DB_MODULES,
    DynamicModule.withComponents(DB_COMPONENTS),
  ],
  declarations: [
    GkClnComponent,
  ],
	// exports: [
	// ],
  providers: [
	// GkCln51Service,

	GkUserService,
	GkRequestService,
	GkClientService,
	ApprovalItemService,
	DatasourceService,
	RequestFileService,
	DashboardService
  ],
})
export class GkClnModule { }
