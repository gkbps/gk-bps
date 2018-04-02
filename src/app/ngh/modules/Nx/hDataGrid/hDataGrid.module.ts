import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';

import { HDataGridComponent } from './hDataGrid.component';

@NgModule({
  declarations: [
    HDataGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    DataViewModule,
    ButtonModule,
    ContextMenuModule,
    MenuModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ToolbarModule,
    TooltipModule,
    SplitButtonModule,

    PanelModule
  ],
  exports: [
    HDataGridComponent
  ],
})
export class HDataGridModule {
}
