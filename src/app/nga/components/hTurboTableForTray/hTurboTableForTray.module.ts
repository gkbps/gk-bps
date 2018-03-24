import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';

import { HTurboTableForTrayComponent } from './hTurboTableForTray.component';

@NgModule({
  declarations: [
    HTurboTableForTrayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,
  ],
  exports: [
    HTurboTableForTrayComponent
  ],
})
export class HTurboTableForTrayModule {
}
