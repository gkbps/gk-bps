import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln7xComponent } from './gkcln7x.component';
import { GkCln7xRoutingModule } from './gkcln7x-routing.module';

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
    GkCln7xComponent
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
    GkCln7xRoutingModule
  ],
  exports: [
  ],
})
export class GkCln7xModule {
}
