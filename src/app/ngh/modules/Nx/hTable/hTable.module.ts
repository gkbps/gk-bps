import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { TableModule } from 'primeng/table';

import { HTableComponent } from './hTable.component';

@NgModule({
  declarations: [
    HTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    ButtonModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ToolbarModule,
    TooltipModule,

    TableModule  
  ],
  exports: [
    HTableComponent
  ],
})
export class HTableModule {
}
