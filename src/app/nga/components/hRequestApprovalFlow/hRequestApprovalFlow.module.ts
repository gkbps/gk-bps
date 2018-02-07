import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DataTableModule } from 'primeng/datatable';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

import { AppTranslationModule } from '../../../app.translation.module';

import { HRequestApprovalFlow } from './hRequestApprovalFlow.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PanelModule,
    MenubarModule,
    DataTableModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,

    AppTranslationModule,
  ],
  declarations: [
    HRequestApprovalFlow,
  ],
  providers: [
  ],
  exports: [
    HRequestApprovalFlow,
  ],
})
export class HRequestApprovalFlowModule {
}
