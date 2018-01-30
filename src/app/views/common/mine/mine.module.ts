import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  PanelModule,
  ScheduleModule,
  DialogModule,
  InputTextModule,
  CalendarModule,
  CheckboxModule,
  ButtonModule
} from 'primeng/primeng';

// Internal
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HTaskListModule } from '../../../nga/components/hTaskList';

import { MineComponent } from './mine.component';
import { MineRoutingModule } from './mine-routing.module';

import { EventService } from './event.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    ScheduleModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,

    NgaModule,
    // HoangModule,
    HTaskListModule,

    MineRoutingModule,
  ],
  declarations: [ MineComponent ],
  providers: [
    EventService,
  ],
})
export class MineModule { }
