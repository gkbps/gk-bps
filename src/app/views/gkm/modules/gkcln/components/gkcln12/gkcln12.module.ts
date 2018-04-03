import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln12RoutingModule } from './gkcln12-routing.module';
import { GkCln12Component } from './gkcln12.component';

@NgModule({
  declarations: [
    GkCln12Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln12RoutingModule
  ]
})
export class GkCln12Module {
}
