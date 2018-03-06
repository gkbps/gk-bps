import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestReducers } from '../../../../../../ngrx/request/requests.reducers';
import { RequestsEffects } from '../../../../../../ngrx/request/requests.effects';
import { RequestsServices } from '../../../../../../ngrx/request/requests.services';

import { ApprovalItemsReducers } from '../../../../../../ngrx/approvalItem/approvalItems.reducers';
import { ApprovalItemsEffects } from '../../../../../../ngrx/approvalItem/approvalItems.effects';
import { ApprovalItemsServices } from '../../../../../../ngrx/approvalItem/approvalItems.services';

import { GkClientReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientRequestReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { PanelModule } from 'primeng/panel';

import { RequestHeaderModule } from '../../../../../../nga/components/requestHeader';
import { RequestDocumentsModule } from '../../../../../../nga/components/requestDocuments';
import { RequestApprovalModule } from '../../../../../../nga/components/requestApproval';

// import { HRequestDocumentsModule } from '../../../../../../nga/components/hRequestDocuments';
// import { HRequestApprovalFlowModule } from '../../../../../../nga/components/hRequestApprovalFlow';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
// import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln31Component } from './gkcln31.component';
import { GkCln31RoutingModule } from './gkcln31-routing.module';

@NgModule({
  declarations: [
    GkCln31Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    StoreModule.forFeature('request', RequestReducers),
    StoreModule.forFeature('approvalItems', ApprovalItemsReducers),
    StoreModule.forFeature('gkClient', GkClientReducers),
    StoreModule.forFeature('gkClientRequest', GkClientRequestReducers),
    EffectsModule.forFeature([
      RequestsEffects,
      ApprovalItemsEffects,
      GkClientsEffects
    ]),

    PanelModule,

    RequestHeaderModule,
    RequestDocumentsModule,
    RequestApprovalModule,
    // HRequestDocumentsModule,
    // HRequestApprovalFlowModule,

    GkClnFormModule,
    // GkClnSharedModule,
    GkCln31RoutingModule
  ],
  exports: [
  ],
  providers: [
    RequestsServices,
    ApprovalItemsServices,
    GkClientsServices
  ]
})
export class GkCln31Module {
}
