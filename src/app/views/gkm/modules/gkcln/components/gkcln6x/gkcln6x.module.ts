import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GkClientReportsSummaryReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { GkCln6xComponent } from './gkcln6x.component';
import { GkCln6xRoutingModule } from './gkcln6x-routing.module';

import { HTurboTableModule } from '../../../../../../nga/components/hTurboTable';

@NgModule({
  declarations: [
    GkCln6xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('gkClientReportsSummary', GkClientReportsSummaryReducers),
    EffectsModule.forFeature([GkClientsEffects]),

    HTurboTableModule,

    GkCln6xRoutingModule
  ],
  exports: [
  ],
  providers: [
    GkClientsServices
  ]
})
export class GkCln6xModule {
}
