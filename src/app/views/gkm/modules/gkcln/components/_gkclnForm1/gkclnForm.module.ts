import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { NgaModule } from '../../../../../../nga/nga.module';

import { HIndividualNavModule } from '../../../../../../nga/components/hIndividualNav';
import { HAddressModule } from '../../../../../../nga/components/hAddress';
import { HContactModule } from '../../../../../../nga/components/hContact';

import { GkClnForm } from './gkclnForm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,

    NgaModule,

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
