import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln16RoutingModule } from './gkcln16-routing.module';
import { GkCln16Component } from './gkcln16.component';

@NgModule({
  declarations: [
    GkCln16Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln16RoutingModule
  ]
})
export class GkCln16Module {
}
