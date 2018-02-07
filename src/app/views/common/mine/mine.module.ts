import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ScheduleModule } from 'primeng/schedule';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

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
