import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HTaskBoxComponent } from './hTaskBox.component';

import {
  // ToolbarModule,
  // ButtonModule,
  // TooltipModule,
  // PanelModule,
  // DropdownModule,
  // InputTextModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    HTaskBoxComponent
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
    HTaskBoxComponent
  ],
})
export class HTaskBoxModule {
}
