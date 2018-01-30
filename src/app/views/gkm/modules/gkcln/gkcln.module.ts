// External
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
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

	ChartModule,
	GrowlModule

} from 'primeng/primeng';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { paginatedGkRequests, gkRequests, selectedGkRequest } from '../../../../store/_reducers/gkRequest.reducer';
import { paginatedGkClients, gkClients, selectedGkClient } from '../../../../store/_reducers/gkClient.reducer';
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
import {
	DbGrid3,
	DbGrid4,
	DbGrid5,
	DbGrid6,
	DbGrid7,
	DbGrid8,
	DbGrid9,
	DbGrid12,
	GkClnDbOverviewAll,
	GkClnDbOverviewActive,
	GkClnDbOverviewInactive,
	GkClnDbOverviewMarked,
	GkClnDbChartDoughnut,
	GkClnDbChartPie,
	GkClnDbChartRadar,
	GkClnDbChartPolarArea,
	GkClnDbChartLine,
} from './components/gkclnDashboard/gkclnDashboard.component';

const DB_COMPONENTS = [
  DbGrid3,
	DbGrid4,
	DbGrid5,
	DbGrid6,
	DbGrid7,
	DbGrid8,
	DbGrid9,
	DbGrid12,
	GkClnDbOverviewAll,
	GkClnDbOverviewActive,
	GkClnDbOverviewInactive,
	GkClnDbOverviewMarked,
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

    DynamicModule.withComponents(DB_COMPONENTS),
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
