import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DataTableModule } from 'primeng/datatable';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

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
