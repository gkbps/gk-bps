import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HDashboardKPIInactiveComponent } from './hDashboardKPIInactive.component';

import { HOverviewBoxHeaderModule } from '../hOverviewBoxHeader';

// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputTextModule } from 'primeng/inputtext';
// import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    HDashboardKPIInactiveComponent
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
    HDashboardKPIInactiveComponent
  ],
})
export class HDashboardKPIInactiveModule {
}
