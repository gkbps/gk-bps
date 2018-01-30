import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln6xComponent } from './gkcln6x.component';
import { GkCln6xRoutingModule } from './gkcln6x-routing.module';

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
    GkCln6xComponent
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
    GkCln6xRoutingModule
  ],
  exports: [
  ],
})
export class GkCln6xModule {
}
