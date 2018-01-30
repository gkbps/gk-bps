import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  PanelModule,
  MenubarModule,
  DataListModule,
  ButtonModule,
  PickListModule,
  DialogModule,
  InputTextModule,

  // InputTextareaModule,
  // CalendarModule,
  // AutoCompleteModule,
  // SplitButtonModule,
  // DropdownModule,
  // PasswordModule,
  // ListboxModule,
  // RadioButtonModule,
  // ConfirmDialogModule
} from 'primeng/primeng';

import { AppTranslationModule } from '../../../app.translation.module';
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HGkDataListModule } from './hGkDataList';
import { HRequestApproval } from './hRequestApproval.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PanelModule,
    MenubarModule,
    DataListModule,
    ButtonModule,
    PickListModule,
    DialogModule,
    InputTextModule,

    // InputTextareaModule,
    // CalendarModule,
    // AutoCompleteModule,
    // SplitButtonModule,
    // DropdownModule,
    // PasswordModule,
    // ListboxModule,
    // RadioButtonModule,
    // ConfirmDialogModule

    AppTranslationModule,
    NgaModule,
    // HoangModule,

    HGkDataListModule
  ],
  declarations: [
    HRequestApproval,
  ],
  providers: [
  ],
  exports: [
    HRequestApproval,
  ],
})
export class HRequestApprovalModule {
}
