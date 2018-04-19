import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestHistoriesReducers } from '../../../../ngrx/requestHistory/requestHistories.reducers';
import { RequestHistoriesEffects } from '../../../../ngrx/requestHistory/requestHistories.effects';
import { RequestHistoriesServices } from '../../../../ngrx/requestHistory/requestHistories.services';

import { RequestHistoryComponent } from './requestHistory.component';

@NgModule({
  declarations: [
    RequestHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    
    TranslateModule,

    StoreModule.forFeature('requestHistories', RequestHistoriesReducers),
    EffectsModule.forFeature([
      RequestHistoriesEffects,
    ]),
  ],
  providers: [
    RequestHistoriesServices
  ],
  exports: [
    RequestHistoryComponent
  ],
})
export class RequestHistoryModule {
}
