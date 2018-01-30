import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
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
  // ConfirmDialogModule
} from 'primeng/primeng';

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
    // ConfirmDialogModule

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
