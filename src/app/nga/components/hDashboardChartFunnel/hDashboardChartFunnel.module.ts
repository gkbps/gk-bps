import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HDashboardChartFunnelComponent } from './hDashboardChartFunnel.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { GrowlModule } from 'primeng/growl';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    HDashboardChartFunnelComponent
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
    GrowlModule,
    ChartModule
  ],
  exports: [
    HDashboardChartFunnelComponent
  ],
})
export class HDashboardChartFunnelModule {
}
