import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
//
// import { ApprovalItemsReducers } from '../../../ngrx/approvalItem/approvalItems.reducers';
// import { ApprovalItemsEffects } from '../../../ngrx/approvalItem/approvalItems.effects';
// import { ApprovalItemsServices } from '../../../ngrx/approvalItem/approvalItems.services';

import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DataListModule } from 'primeng/datalist';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

// import { AppTranslationModule } from '../../../app.translation.module';
// import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

// import { HGkDataListModule } from './hGkDataList';
import { HRequestApproval } from './hRequestApproval.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    PanelModule,
    MenubarModule,
    DataListModule,
    ButtonModule,
    PickListModule,
    DialogModule,
    InputTextModule,

    // AppTranslationModule,
    // NgaModule,
    // HoangModule,

    // HGkDataListModule

    // StoreModule.forFeature('approvalItems', ApprovalItemsReducers),
    // EffectsModule.forFeature([
    //   ApprovalItemsEffects
    // ]),
  ],
  declarations: [
    HRequestApproval,
  ],
  providers: [
    // ApprovalItemsServices
  ],
  exports: [
    HRequestApproval,
  ],
})
export class HRequestApprovalModule {
}
