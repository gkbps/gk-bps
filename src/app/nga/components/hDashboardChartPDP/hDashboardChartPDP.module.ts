import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';

import { HDashboardChartPDPComponent } from './hDashboardChartPDP.component';

@NgModule({
  declarations: [
    HDashboardChartPDPComponent
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
    CheckboxModule,
    ChartModule
  ],
  exports: [
    HDashboardChartPDPComponent
  ],
})
export class HDashboardChartPDPModule {
}
