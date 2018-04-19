import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DataListModule } from 'primeng/datalist';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';

import { TranslateModule } from '@ngx-translate/core';

import { HRequestApproval } from './hRequestApproval.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    DataListModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    PickListModule,

    TranslateModule,
  ],
  declarations: [
    HRequestApproval,
  ],
  exports: [
    HRequestApproval,
  ],
})
export class HRequestApprovalModule {
}
