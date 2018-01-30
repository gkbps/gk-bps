import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln50Component } from './gkcln50.component';
import { GkCln50RoutingModule } from './gkcln50-routing.module';

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
    GkCln50Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln50RoutingModule
  ],
  exports: [
  ],
})
export class GkCln50Module {
}
