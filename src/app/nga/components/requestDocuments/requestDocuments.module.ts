import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
// import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestDocumentsReducers } from '../../../ngrx/requestDocument/requestDocuments.reducers';
import { RequestDocumentReducers } from '../../../ngrx/requestDocument/requestDocuments.reducers';
import { RequestDocumentsEffects } from '../../../ngrx/requestDocument/requestDocuments.effects';
import { RequestDocumentsServices } from '../../../ngrx/requestDocument/requestDocuments.services';

// import { AppTranslationModule } from '../../../app.translation.module';
// import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { RequestDocuments } from './requestDocuments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    PanelModule,
    MenubarModule,
    TooltipModule,
    // DataTableModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ButtonModule,
    // ConfirmDialogModule

    TranslateModule,

    StoreModule.forFeature('requestDocuments', RequestDocumentsReducers),
    StoreModule.forFeature('requestDocument', RequestDocumentReducers),
    EffectsModule.forFeature([
      RequestDocumentsEffects,
    ]),

    // AppTranslationModule,
    // NgaModule,
    // HoangModule,
  ],
  declarations: [
    RequestDocuments,
  ],
  providers: [
    RequestDocumentsServices,
  ],
  exports: [
    RequestDocuments,
  ],
})
export class RequestDocumentsModule {
}
