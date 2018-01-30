import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  SharedModule,
  MenubarModule,
  DataTableModule,
  ButtonModule,
  MultiSelectModule,
  InputTextModule,
  ContextMenuModule
} from 'primeng/primeng';

import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HNavBoardModule } from '../../../nga/components/hNavBoard';

import { TrayComponent } from './tray.component';
import { TrayRoutingModule } from './tray-routing.module';

import { Tray00Component } from './components/tray00/tray00.component';

import { InboxComponent } from './components/inbox.component';
import { OutboxComponent } from './components/outbox.component';

import { DraftComponent } from './components/draft.component';
import { InProgressComponent } from './components/inProgress.component';
import { CompletedComponent } from './components/completed.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { paginatedGkRequests, gkRequests, selectedGkRequest } from '../../../store/_reducers/gkRequest.reducer';

import { GkRequestService } from '../../../store/_services/gkRequest.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    MenubarModule,
    DataTableModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,

    StoreModule.forRoot({
  	  paginatedGkRequests: paginatedGkRequests,
  	  gkRequests: gkRequests,
  	  selectedGkRequest: selectedGkRequest
  	}),
  	StoreDevtoolsModule.instrument(),

    NgaModule,
    // HoangModule,

    HNavBoardModule,

    TrayRoutingModule,
  ],
  declarations: [
    InboxComponent,
    OutboxComponent,

    DraftComponent,
    InProgressComponent,
    CompletedComponent,

    TrayComponent,
    Tray00Component,
  ],
  providers: [
	   GkRequestService,
  ],
})
export class TrayModule { }
