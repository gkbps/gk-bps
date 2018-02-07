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

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

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
