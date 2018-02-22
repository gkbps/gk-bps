import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GkClientReducers } from '../../../../../../ngrx/gkClient/gkClients.reducers';
import { GkClientsEffects } from '../../../../../../ngrx/gkClient/gkClients.effects';
import { GkClientsServices } from '../../../../../../ngrx/gkClient/gkClients.services';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';

import { NgaModule } from '../../../../../../nga/nga.module';

import { HIndividualNavModule } from '../../../../../../nga/components/hIndividualNav';
import { HAddressModule } from '../../../../../../nga/components/hAddress';
import { HContactModule } from '../../../../../../nga/components/hContact';

import { GkClnShared } from './gkclnShared.component';
import { GkClnForm } from './components/gkclnForm/gkclnForm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    StoreModule.forFeature('gkClient', GkClientReducers),
    EffectsModule.forFeature([GkClientsEffects]),
    // StoreDevtoolsModule.instrument({}),

    ToolbarModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    KeyFilterModule,
    TabViewModule,

    NgaModule,

    HIndividualNavModule,
    HAddressModule,
    HContactModule
  ],
  declarations: [
    GkClnShared,
    GkClnForm
  ],
  providers: [
    // ConfirmationService
    GkClientsServices
  ],
  exports: [
    GkClnShared,
    GkClnForm
  ],
})
export class GkClnSharedModule {
}
