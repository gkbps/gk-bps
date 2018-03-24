import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GkClientDashboardsReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { GkCln5xComponent } from './gkcln5x.component';
import { GkCln5xRoutingModule } from './gkcln5x-routing.module';

import { HTurboTableModule } from '../../../../../../nga/components/hTurboTable';

@NgModule({
  declarations: [
    GkCln5xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('gkClientDashboards', GkClientDashboardsReducers),
    EffectsModule.forFeature([GkClientsEffects]),

    HTurboTableModule,

    GkCln5xRoutingModule
  ],
  exports: [
  ],
  providers: [
    GkClientsServices
  ]
})
export class GkCln5xModule {
}
