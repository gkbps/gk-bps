import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HTaskListComponent } from './hTaskList.component';

import {
  PanelModule,
  ButtonModule,
  MenuModule,
  CheckboxModule,
  InputTextModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HTaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    PanelModule,
    ButtonModule,
    MenuModule,
    CheckboxModule,
    InputTextModule,
  ],
  exports: [
    HTaskListComponent
  ],
})
export class HTaskListModule {
}
