// External
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartModule } from 'primeng/chart';
import { GrowlModule } from 'primeng/growl';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { paginatedGkRequests, gkRequests, selectedGkRequest } from '../../../../store/_reducers/gkRequest.reducer';
import { paginatedGkClients, gkClients, selectedGkClient } from '../../../../store/_reducers/gkClient.reducer';
import { paginatedGkClientsDashboard, selectedGkClientDashboard } from '../../../../store/_reducers/gkClient.reducer';

import { apiGkUsers } from '../../../../store/_reducers/gkUser.reducer';
import { standardApprovalItems } from '../../../../store/_reducers/approvalItem.reducer';
import { requestFiles } from '../../../../store/_reducers/requestFile.reducer';

import { GkUserService } from '../../../../store/_services/gkUser.service';
import { GkClientService } from '../../../../store/_services/gkClient.service';
import { GkRequestService } from '../../../../store/_services/gkRequest.service';
import { ApprovalItemService } from '../../../../store/_services/approvalItem.service';
import { RequestFileService } from '../../../../store/_services/requestFile.service';

// Internal
import { NgaModule } from '../../../../nga/nga.module';
// import { HoangModule } from '../../../../nga/hoang.module';

// import { HNavBoardModule } from '../../../../nga/components/hNavBoard';
// import { HLeadFormModule } from '../../../../nga/components/hLeadForm';
// import { HViewChangesModule } from '../../../../nga/components/hViewChanges';
// import { HUploadFormModule } from '../../../../nga/components/hUploadForm';
// import { HDownloadFormModule } from '../../../../nga/components/hDownloadForm';
// import { HHistoryModule } from '../../../../nga/components/hHistory';
import { HOverviewBoxHeaderModule } from '../../../../nga/components/hOverviewBoxHeader';

// import { RequestHeaderModule } from '../../../base/requestHeader/requestHeader.module';
// import { RequestDocumentsModule } from '../../../base/requestDocuments/requestDocuments.module';
// import { RequestApprovalFlowModule } from '../../../base/requestApprovalFlow/requestApprovalFlow.module';
// import { RequestApprovalModule } from '../../../base/requestApproval/requestApproval.module';
//
// import { HRequestHeaderModule } from '../../../../nga/components/hRequestHeader';
// import { HRequestDocumentsModule } from '../../../../nga/components/hRequestDocuments';
// import { HRequestApprovalFlowModule } from '../../../../nga/components/hRequestApprovalFlow';
// import { HRequestApprovalModule } from '../../../../nga/components/hRequestApproval';

// import { GkClnFormModule } from './components/gkclnForm/gkclnForm.module';

import { GkClnComponent } from './gkcln.component';
import { GkClnRoutingModule } from './gkcln-routing.module';

import { GkCln51Service } from './components/gkcln51/gkcln51.service';

import { DynamicModule } from 'ng-dynamic-component';

// For dynamic components only - remove once these isolated
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import {
	GkClnDbChartDoughnut,
	GkClnDbChartPie,
	GkClnDbChartRadar,
	GkClnDbChartPolarArea,
	GkClnDbChartLine,
} from './components/gkclnDashboard/gkclnDashboard.component';

import { HNewsModule } from '../../../../nga/components/hNews';
import { HDashboardBlankModule } from '../../../../nga/components/hDashboardBlank/hDashboardBlank.module';
import { HDashboardKPIActiveModule } from '../../../../nga/components/hDashboardKPIActive/hDashboardKPIActive.module';
import { HDashboardKPIInactiveModule } from '../../../../nga/components/hDashboardKPIInactive/hDashboardKPIInactive.module';
import { HDashboardKPIMarkedModule } from '../../../../nga/components/hDashboardKPIMarked/hDashboardKPIMarked.module';
import { HDashboardKPIUnmarkedModule } from '../../../../nga/components/hDashboardKPIUnmarked/hDashboardKPIUnmarked.module';
import { HDashboardChartDoughnutModule } from '../../../../nga/components/hDashboardChartDoughnut/hDashboardChartDoughnut.module';
import { HDashboardChartPieModule } from '../../../../nga/components/hDashboardChartPie/hDashboardChartPie.module';
import { HDashboardChartRadarModule } from '../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.module';
import { HDashboardChartPolarAreaModule } from '../../../../nga/components/hDashboardChartPolarArea/hDashboardChartPolarArea.module';
import { HDashboardChartLineModule } from '../../../../nga/components/hDashboardChartLine/hDashboardChartLine.module';
const DB_MODULES = [
	HNewsModule,
	HDashboardBlankModule,
	HDashboardKPIActiveModule,
	HDashboardKPIInactiveModule,
	HDashboardKPIMarkedModule,
	HDashboardKPIUnmarkedModule,

	HDashboardChartDoughnutModule,
	HDashboardChartPieModule,
	HDashboardChartRadarModule,
	HDashboardChartPolarAreaModule,
	HDashboardChartLineModule
];

import { HNewsComponent } from '../../../../nga/components/hNews/hNews.component';
import { HDashboardBlankComponent } from '../../../../nga/components/hDashboardBlank/hDashboardBlank.component';
import { HDashboardKPIActiveComponent } from '../../../../nga/components/hDashboardKPIActive//hDashboardKPIActive.component';
import { HDashboardKPIInactiveComponent } from '../../../../nga/components/hDashboardKPIInactive/hDashboardKPIInactive.component';
import { HDashboardKPIMarkedComponent } from '../../../../nga/components/hDashboardKPIMarked/hDashboardKPIMarked.component';
import { HDashboardKPIUnmarkedComponent } from '../../../../nga/components/hDashboardKPIUnmarked/hDashboardKPIUnmarked.component';
import { HDashboardChartDoughnutComponent } from '../../../../nga/components/hDashboardChartDoughnut/hDashboardChartDoughnut.component';
import { HDashboardChartPieComponent } from '../../../../nga/components/hDashboardChartPie/hDashboardChartPie.component';
import { HDashboardChartRadarComponent } from '../../../../nga/components/hDashboardChartRadar/hDashboardChartRadar.component';
import { HDashboardChartPolarAreaComponent } from '../../../../nga/components/hDashboardChartPolarArea/hDashboardChartPolarArea.component';
import { HDashboardChartLineComponent } from '../../../../nga/components/hDashboardChartLine/hDashboardChartLine.component';
const DB_COMPONENTS = [
	GkClnDbChartDoughnut,
	GkClnDbChartPie,
	GkClnDbChartRadar,
	GkClnDbChartPolarArea,
	GkClnDbChartLine
];

const DB_COMPONENTS1 = [
	HNewsComponent,
	HDashboardBlankComponent,
	HDashboardKPIActiveComponent,
	HDashboardKPIInactiveComponent,
	HDashboardKPIMarkedComponent,
	HDashboardKPIUnmarkedComponent,

	HDashboardChartDoughnutComponent,
	HDashboardChartPieComponent,
	HDashboardChartRadarComponent,
	HDashboardChartPolarAreaComponent,
	HDashboardChartLineComponent,

	GkClnDbChartDoughnut,
	GkClnDbChartPie,
	GkClnDbChartRadar,
	GkClnDbChartPolarArea,
	GkClnDbChartLine,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

		// SharedModule,
		// MenubarModule,
		// DataTableModule,
		// ButtonModule,
		// MultiSelectModule,
		// ContextMenuModule,
    //
		// DropdownModule,
		// PanelModule,
		// PickListModule,
    //
		ChartModule,
		GrowlModule,

		StoreModule.forRoot({
			apiGkUsers: apiGkUsers,

			paginatedGkRequests: paginatedGkRequests,
		  gkRequests: gkRequests,
		  selectedGkRequest: selectedGkRequest,

		  paginatedGkClients: paginatedGkClients,
		  gkClients: gkClients,
		  selectedGkClient: selectedGkClient,

			paginatedGkClientsDashboard: paginatedGkClientsDashboard,
			selectedGkClientDashboard: selectedGkClientDashboard,

			standardApprovalItems: standardApprovalItems,

			requestFiles: requestFiles
		}),
		StoreDevtoolsModule.instrument(),

    NgaModule,
		// HoangModule,

		// HNavBoardModule,
		// HLeadFormModule,
		// HViewChangesModule,
		// HUploadFormModule,
		// HDownloadFormModule,
		// HHistoryModule,
		HOverviewBoxHeaderModule,

		// RequestHeaderModule,
		// RequestDocumentsModule,
		// RequestApprovalFlowModule,
		// RequestApprovalModule,

		// HRequestHeaderModule,
		// HRequestDocumentsModule,
		// HRequestApprovalFlowModule,
		// HRequestApprovalModule,
    //
    // GkClnFormModule,
		GkClnRoutingModule,

		// For dynamic components only - remove once these isolated
		ToolbarModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,

		DB_MODULES,
    DynamicModule.withComponents(DB_COMPONENTS1),
  ],
  declarations: [
    GkClnComponent,
    DB_COMPONENTS,
  ],
	// exports: [
  //
	// ],
  // entryComponents:[
  //   DB_COMPONENTS,
  // ],
  providers: [
	GkCln51Service,

	GkUserService,
	GkRequestService,
	GkClientService,
	ApprovalItemService,
	RequestFileService
  ],
})
export class GkClnModule { }
