import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln1xComponent } from './gkcln1x.component';
import { GkCln1xRoutingModule } from './gkcln1x-routing.module';

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
    GkCln1xComponent
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
    GkCln1xRoutingModule
  ],
  exports: [
  ],
})
export class GkCln1xModule {
}
