import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln80Component } from './gkcln80.component';
import { GkCln80RoutingModule } from './gkcln80-routing.module';

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
    GkCln80Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln80RoutingModule
  ],
  exports: [
  ],
})
export class GkCln80Module {
}
