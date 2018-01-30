import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  SharedModule,
  PanelModule,
  MenubarModule,
  DataTableModule,
  MultiSelectModule,
  InputTextModule,
  ContextMenuModule,
  DialogModule,
  FileUploadModule,
  ButtonModule,
  // ConfirmDialogModule
} from 'primeng/primeng';


import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppTranslationModule } from '../../../app.translation.module';
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HRequestDocuments } from './hRequestDocuments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    PanelModule,
    MenubarModule,
    DataTableModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DialogModule,
    FileUploadModule,
    ButtonModule,
    // ConfirmDialogModule

    AppTranslationModule,
    NgaModule,
    // HoangModule,
  ],
  declarations: [
    HRequestDocuments,
  ],
  providers: [
  ],
  exports: [
    HRequestDocuments,
  ],
})
export class HRequestDocumentsModule {
}
