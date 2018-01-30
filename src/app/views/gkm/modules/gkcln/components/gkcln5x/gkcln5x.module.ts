import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln5xComponent } from './gkcln5x.component';
import { GkCln5xRoutingModule } from './gkcln5x-routing.module';

import {
  // SharedModule,
  MenubarModule,
  DataTableModule,
  ButtonModule,
  MultiSelectModule,
  InputTextModule,
  ContextMenuModule,
  // PaginatorModule,
  // ToolbarModule,
  // ButtonModule,
  // TooltipModule,
  // PanelModule,
  // DropdownModule,
  // InputTextModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    GkCln5xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    TranslateModule,

    MenubarModule,
    DataTableModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,

    HNavBoardModule,
    GkCln5xRoutingModule
  ],
  exports: [
  ],
})
export class GkCln5xModule {
}
