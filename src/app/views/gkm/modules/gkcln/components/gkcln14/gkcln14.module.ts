import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln14RoutingModule } from './gkcln14-routing.module';
import { GkCln14Component } from './gkcln14.component';

@NgModule({
  declarations: [
    GkCln14Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln14RoutingModule
  ]
})
export class GkCln14Module {
}
