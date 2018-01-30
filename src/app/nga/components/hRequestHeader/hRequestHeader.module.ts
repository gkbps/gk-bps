import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ToolbarModule,
  MenubarModule,
  PanelModule,
  InputTextModule,
  InputTextareaModule,
  AutoCompleteModule,
  ChipsModule,
  DropdownModule,
  ConfirmDialogModule,
  ButtonModule,

  // CalendarModule,
  // SplitButtonModule,
  // PasswordModule,
  // ListboxModule,
  // RadioButtonModule,
  // DialogModule,
} from 'primeng/primeng';

import { AppTranslationModule } from '../../../app.translation.module';
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HRequestHeader } from './hRequestHeader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ToolbarModule,
    MenubarModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    DropdownModule,
    ConfirmDialogModule,
    ButtonModule,

    // CalendarModule,
    // SplitButtonModule,
    // PasswordModule,
    // ListboxModule,
    // RadioButtonModule,
    // DialogModule,

    AppTranslationModule,
    NgaModule,
    // HoangModule,
  ],
  declarations: [
    HRequestHeader,
  ],
  providers: [
  ],
  exports: [
    HRequestHeader,
  ],
})
export class HRequestHeaderModule {
}
