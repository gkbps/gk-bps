import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { HMessageListComponent } from './hMessageList.component';

import {
  PanelModule,
  // DropdownModule,
  // InputTextModule,
  ButtonModule
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HMessageListComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    PanelModule,
    // DropdownModule,
    // InputTextModule,
    ButtonModule
  ],
  exports: [
    HMessageListComponent
  ],
})
export class HMessageListModule {
}
