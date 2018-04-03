import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln13RoutingModule } from './gkcln13-routing.module';
import { GkCln13Component } from './gkcln13.component';

@NgModule({
  declarations: [
    GkCln13Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln13RoutingModule
  ]
})
export class GkCln13Module {
}
