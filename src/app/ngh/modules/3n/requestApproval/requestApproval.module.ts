import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { TranslateModule } from '@ngx-translate/core';

import { UsersServices } from '../../../../ngrx/user/user.service';

import { RequestApproval } from './requestApproval.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    PanelModule,
    MenubarModule,
    TooltipModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ButtonModule,
    AutoCompleteModule,

    TranslateModule,
  ],
  declarations: [
    RequestApproval,
  ],
  providers: [
    UsersServices
  ],
  exports: [
    RequestApproval,
  ],
})
export class RequestApprovalModule {
}
