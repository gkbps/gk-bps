import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestsReducers } from '../../../ngrx/request/requests.reducers';
import { RequestsEffects } from '../../../ngrx/request/requests.effects';
import { RequestsServices } from '../../../ngrx/request/requests.services';

import { HDataTableByTrayModule } from '../../../nga/components/hDataTableByTray';
import { HTurboTableForTrayModule } from '../../../nga/components/hTurboTableForTray';

import { DraftComponent } from './draft.component';
import { DraftRoutingModule } from './draft-routing.module';

@NgModule({
  declarations: [
    DraftComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('requests', RequestsReducers),
    EffectsModule.forFeature([RequestsEffects]),

    HDataTableByTrayModule,
    HTurboTableForTrayModule,

    DraftRoutingModule
  ],
  exports: [
  ],
  providers: [
    RequestsServices
  ]
})
export class DraftModule {
}
