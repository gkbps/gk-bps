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

import { AppTranslationModule } from '../../../app.translation.module';
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { RequestHeader } from './requestHeader.component';
import { UserService } from '../../../ngrx/user/user.service';

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
    RequestHeader,
  ],
  providers: [
    UserService
  ],
  exports: [
    RequestHeader,
  ],
})
export class RequestHeaderModule {
}
