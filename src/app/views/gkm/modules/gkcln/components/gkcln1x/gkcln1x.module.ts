import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GkClientsReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { GkCln1xRoutingModule } from './gkcln1x-routing.module';
import { GkCln1xComponent } from './gkcln1x.component';

import { HTableModule } from '../../../../../../ngh/modules/Nx/hTable';
import { HDataGridModule } from '../../../../../../ngh/modules/Nx/hDataGrid';

@NgModule({
  declarations: [
    GkCln1xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('gkClients', GkClientsReducers),
    EffectsModule.forFeature([GkClientsEffects]),

    HTableModule,
    HDataGridModule,

    GkCln1xRoutingModule
  ],
  providers: [
    GkClientsServices
  ]
})
export class GkCln1xModule {
}
