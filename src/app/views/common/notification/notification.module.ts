// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';

// import { NgaModule } from '../../../nga/nga.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NotificationsReducers, NotificationReducers } from '../../../ngrx/notification/notifications.reducers';
import { NotificationsEffects } from '../../../ngrx/notification/notifications.effects';
import { NotificationsServices } from '../../../ngrx/notification/notifications.services';

// import { HDataTablePlainModule } from '../../../nga/components/hDataTablePlain/hDataTablePlain.module';

// Internal
// import { AppTranslationModule } from '../../../app.translation.module';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';

import { NotificationTableComponent } from './components/notification-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    // NgaModule,
    // HoangModule,
    TranslateModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,

    StoreModule.forFeature('notifications1', NotificationsReducers),
    StoreModule.forFeature('notification', NotificationReducers),
    EffectsModule.forFeature([ NotificationsEffects ]),

    // HDataTablePlainModule,

    // AppTranslationModule,
    NotificationRoutingModule,
  ],
  declarations: [
    NotificationComponent,
    NotificationTableComponent
  ],
  providers: [
    NotificationsServices
  ],
})
export class NotificationModule { }
