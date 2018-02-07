import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HDashboardChartPolarAreaComponent } from './hDashboardChartPolarArea.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    HDashboardChartPolarAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    DropdownModule,
    ChartModule
  ],
  exports: [
    HDashboardChartPolarAreaComponent
  ],
})
export class HDashboardChartPolarAreaModule {
}
