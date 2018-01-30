import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln30Component } from './gkcln30.component';
import { GkCln30RoutingModule } from './gkcln30-routing.module';

import {
  SharedModule,
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
    GkCln30Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln30RoutingModule
  ],
  exports: [
  ],
})
export class GkCln30Module {
}
