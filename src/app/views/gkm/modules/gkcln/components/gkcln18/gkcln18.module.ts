import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln18RoutingModule } from './gkcln18-routing.module';
import { GkCln18Component } from './gkcln18.component';

@NgModule({
  declarations: [
    GkCln18Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln18RoutingModule
  ]
})
export class GkCln18Module {
}
