import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HChangeDashboardComponent } from './hChangeDashboard.component';

import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    HChangeDashboardComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [
    HChangeDashboardComponent
  ],
})
export class HChangeDashboardModule {
}
