import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GkClientReportsDetailReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { GkCln7xComponent } from './gkcln7x.component';
import { GkCln7xRoutingModule } from './gkcln7x-routing.module';

import { HTurboTableModule } from '../../../../../../nga/components/hTurboTable';

@NgModule({
  declarations: [
    GkCln7xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('gkClientReportsDetail', GkClientReportsDetailReducers),
    EffectsModule.forFeature([GkClientsEffects]),

    HTurboTableModule,

    GkCln7xRoutingModule
  ],
  exports: [
  ],
  providers: [
    GkClientsServices
  ]
})
export class GkCln7xModule {
}
