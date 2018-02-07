import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln1xComponent } from './gkcln1x.component';
import { GkCln1xRoutingModule } from './gkcln1x-routing.module';

// import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  declarations: [
    GkCln1xComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    TranslateModule,

    // MenubarModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    DataTableModule,
    TableModule,
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
