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

import { HNavBoardModule } from '../../../nga/components/hNavBoard';

import { TrayComponent } from './tray.component';
import { TrayRoutingModule } from './tray-routing.module';

import { Tray00Component } from './components/tray00/tray00.component';
import { InboxComponent } from './components/inbox.component';
import { OutboxComponent } from './components/outbox.component';
import { DraftComponent } from './components/draft.component';
import { InProgressComponent } from './components/inProgress.component';
import { CompletedComponent } from './components/completed.component';

@NgModule({
  declarations: [
    InboxComponent,
    OutboxComponent,

    DraftComponent,
    InProgressComponent,
    CompletedComponent,

    TrayComponent,
    Tray00Component,
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    StoreModule.forFeature('requests', RequestsReducers),
    EffectsModule.forRoot([RequestsEffects]),

    HNavBoardModule,
    HDataTableByTrayModule,

    TrayRoutingModule,
  ],
  providers: [
     RequestsServices
  ],
})
export class TrayModule { }
