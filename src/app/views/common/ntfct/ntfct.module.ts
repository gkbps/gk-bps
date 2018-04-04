// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../ngh/modules/1n/hLeadForm';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NotificationReducers } from '../../../ngrx/notification/notifications.reducers';
import { NotificationsEffects } from '../../../ngrx/notification/notifications.effects';
import { NotificationsServices } from '../../../ngrx/notification/notifications.services';

// Internal
import { NtfctComponent } from './ntfct.component';
import { NtfctRoutingModule } from './ntfct-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,

    TranslateModule,

    HLeadFormModule,

    StoreModule.forFeature('notification', NotificationReducers),
    EffectsModule.forFeature([NotificationsEffects]),

    NtfctRoutingModule,
  ],
  declarations: [
    NtfctComponent,
  ],
  providers: [
  ],
})
export class NtfctModule { }
