import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HMapComponent } from './hMap.component';

import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    HMapComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [
    HMapComponent
  ],
})
export class HMapModule {
}
