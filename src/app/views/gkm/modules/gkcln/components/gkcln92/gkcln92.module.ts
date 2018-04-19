import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApprovalItemsReducers } from '../../../../../../ngrx/approvalItem/approvalItems.reducers';
import { ApprovalItemsEffects } from '../../../../../../ngrx/approvalItem/approvalItems.effects';
import { ApprovalItemsServices } from '../../../../../../ngrx/approvalItem/approvalItems.services';

import { HRequestApprovalModule } from '../../../../../../ngh/modules/9n/hRequestApproval';

import { GkCln92Component } from './gkcln92.component';
import { GkCln92RoutingModule } from './gkcln92-routing.module';

@NgModule({
  declarations: [
    GkCln92Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    StoreModule.forFeature('approvalItems', ApprovalItemsReducers),
    EffectsModule.forFeature([
      ApprovalItemsEffects
    ]),

    HRequestApprovalModule,
    GkCln92RoutingModule
  ],
  providers: [
    ApprovalItemsServices
  ]
})
export class GkCln92Module {
}
