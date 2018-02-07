import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HOverviewBoxHeaderComponent } from './hOverviewBoxHeader.component';

// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    HOverviewBoxHeaderComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    // ToolbarModule,
    // ButtonModule,
    // TooltipModule,
    // PanelModule,
    // DropdownModule,
    // InputTextModule,
  ],
  exports: [
    HOverviewBoxHeaderComponent
  ],
})
export class HOverviewBoxHeaderModule {
}
