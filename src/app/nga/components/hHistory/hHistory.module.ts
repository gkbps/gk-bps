import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HHistory } from './hHistory.component';

import {
  PaginatorModule,
  // ToolbarModule,
  // ButtonModule,
  // TooltipModule,
  // PanelModule,
  // DropdownModule,
  // InputTextModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    HHistory
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    PaginatorModule,
    // ToolbarModule,
    // ButtonModule,
    // TooltipModule,
    // PanelModule,
    // DropdownModule,
    // InputTextModule,
  ],
  exports: [
    HHistory
  ],
})
export class HHistoryModule {
}
