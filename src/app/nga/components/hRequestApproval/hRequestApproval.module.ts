import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DataListModule } from 'primeng/datalist';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { AppTranslationModule } from '../../../app.translation.module';
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HGkDataListModule } from './hGkDataList';
import { HRequestApproval } from './hRequestApproval.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PanelModule,
    MenubarModule,
    DataListModule,
    ButtonModule,
    PickListModule,
    DialogModule,
    InputTextModule,

    AppTranslationModule,
    NgaModule,
    // HoangModule,

    HGkDataListModule
  ],
  declarations: [
    HRequestApproval,
  ],
  providers: [
  ],
  exports: [
    HRequestApproval,
  ],
})
export class HRequestApprovalModule {
}
