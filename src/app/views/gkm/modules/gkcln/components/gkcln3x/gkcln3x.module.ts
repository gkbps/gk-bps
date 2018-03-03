import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestsReducers } from '../../../../../../ngrx/request/requests.reducers';
import { RequestsEffects } from '../../../../../../ngrx/request/requests.effects';
import { RequestsServices } from '../../../../../../ngrx/request/requests.services';

import { HDataTableByTrayModule } from '../../../../../../nga/components/hDataTableByTray';

import { GkCln3xComponent } from './gkcln3x.component';
import { GkCln3xRoutingModule } from './gkcln3x-routing.module';

@NgModule({
  declarations: [
    GkCln3xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('requests', RequestsReducers),
    EffectsModule.forFeature([RequestsEffects]),

    HDataTableByTrayModule,

    GkCln3xRoutingModule
  ],
  exports: [
  ],
  providers: [
    RequestsServices
  ]
})
export class GkCln3xModule {
}
