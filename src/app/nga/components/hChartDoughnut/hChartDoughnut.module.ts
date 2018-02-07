import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HChartDoughnutComponent } from './hChartDoughnut.component';

import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    HChartDoughnutComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    HChartDoughnutComponent
  ],
})
export class HChartDoughnutModule {
}
