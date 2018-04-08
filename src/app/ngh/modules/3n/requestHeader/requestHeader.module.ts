import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestApprovalReducers } from '../../../../ngrx/requestApproval/requestApproval.reducers';
import { RequestApprovalEffects } from '../../../../ngrx/requestApproval/requestApproval.effects';
import { RequestApprovalServices } from '../../../../ngrx/requestApproval/requestApproval.services';

import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../nga/nga.module';

import { RequestHeader } from './requestHeader.component';
import { UsersServices } from '../../../../ngrx/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('requestApproval', RequestApprovalReducers),
    EffectsModule.forFeature([
      RequestApprovalEffects,
    ]),

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

    AppTranslationModule,
    NgaModule,
  ],
  declarations: [
    RequestHeader,
  ],
  providers: [
    RequestApprovalServices,
    UsersServices,
  ],
  exports: [
    RequestHeader,
  ],
})
export class RequestHeaderModule {
}
