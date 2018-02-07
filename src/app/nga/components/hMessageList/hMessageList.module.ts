import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { HMessageListComponent } from './hMessageList.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HMessageListComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    PanelModule,
    ButtonModule
  ],
  exports: [
    HMessageListComponent
  ],
})
export class HMessageListModule {
}
