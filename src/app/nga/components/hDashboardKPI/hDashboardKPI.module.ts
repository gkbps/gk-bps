import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { HOverviewBoxHeaderModule } from '../hOverviewBoxHeader';
import { IconsService } from '../../../nga/common/icons.service';

import { HDashboardKPIComponent } from './hDashboardKPI.component';

@NgModule({
  declarations: [
    HDashboardKPIComponent
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

    HOverviewBoxHeaderModule
  ],
  exports: [
    HDashboardKPIComponent
  ],
  providers: [
    IconsService
  ]
})
export class HDashboardKPIModule {
}
