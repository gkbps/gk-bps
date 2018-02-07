import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HDashboardKPIActiveComponent } from './hDashboardKPIActive.component';

import { HOverviewBoxHeaderModule } from '../hOverviewBoxHeader';

// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputTextModule } from 'primeng/inputtext';
// import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    HDashboardKPIActiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    HOverviewBoxHeaderModule
    // ToolbarModule,
    // ButtonModule,
    // TooltipModule,
    // InputTextModule,
    // DropdownModule
  ],
  exports: [
    HDashboardKPIActiveComponent
  ],
})
export class HDashboardKPIActiveModule {
}
