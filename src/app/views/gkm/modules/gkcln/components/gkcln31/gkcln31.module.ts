import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { RequestHeaderModule } from '../../../../../../ngh/modules/3n/requestHeader';
import { RequestDocumentsModule } from '../../../../../../ngh/modules/3n/requestDocuments';
import { RequestApprovalModule } from '../../../../../../ngh/modules/3n/requestApproval';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';

import { GkCln31RoutingModule } from './gkcln31-routing.module';

import { GkCln31Component } from './gkcln31.component';

@NgModule({
  declarations: [
    GkCln31Component
  ],
  imports: [
    CommonModule,

    PanelModule,

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

    RequestHeaderModule,
    RequestDocumentsModule,
    RequestApprovalModule,

    GkClnFormModule,

    GkCln31RoutingModule
  ],
  providers: [
    RequestsServices,
    ApprovalItemsServices,
    GkClientsServices
  ]
})
export class GkCln31Module {
}
