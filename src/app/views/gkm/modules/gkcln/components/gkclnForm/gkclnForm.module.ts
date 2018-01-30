import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../../../../../app.translation.module';
import { NgaModule } from '../../../../../../nga/nga.module';
// import { HoangModule } from '../../../../../../nga/hoang.module';

import { HIndividualNavModule } from '../../../../../../nga/components/hIndividualNav';
import { HAddressModule } from '../../../../../../nga/components/hAddress';
import { HContactModule } from '../../../../../../nga/components/hContact';

import { GkClnForm } from './gkclnForm.component';

import {
  ToolbarModule,
  ButtonModule,
  PanelModule,
  DropdownModule,
  InputTextModule,
  TabViewModule,

  // InputTextareaModule,
  // CalendarModule,
  // AutoCompleteModule,
  // SplitButtonModule,
  // PasswordModule,
  // ListboxModule,
  // RadioButtonModule,
  // DialogModule,
} from 'primeng/primeng';

// import {
//   ConfirmationService
// } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,

    ToolbarModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,

    // InputTextareaModule,
    // CalendarModule,
    // AutoCompleteModule,
    // SplitButtonModule,
    // PasswordModule,
    // ListboxModule,
    // RadioButtonModule,
    // DialogModule,

    NgaModule,
    // HoangModule,

    HIndividualNavModule,
    HAddressModule,
    HContactModule
  ],
  declarations: [
    GkClnForm,
  ],
  providers: [
    // ConfirmationService
  ],
  exports: [
    GkClnForm,
  ],
})
export class GkClnFormModule {
}
