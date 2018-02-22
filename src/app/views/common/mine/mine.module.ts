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

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodosReducers } from '../../../ngrx/todo/todos.reducers';
import { TodosEffects } from '../../../ngrx/todo/todos.effects';
import { TodosServices } from '../../../ngrx/todo/todos.services';

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

    StoreModule.forFeature('todos', TodosReducers),
    EffectsModule.forFeature([TodosEffects]),

    NgaModule,
    // HoangModule,
    HTaskListModule,

    MineRoutingModule,
  ],
  declarations: [ MineComponent ],
  providers: [
    EventService,
    TodosServices
  ],
})
export class MineModule { }
