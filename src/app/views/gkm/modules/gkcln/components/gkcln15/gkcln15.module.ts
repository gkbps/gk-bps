import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln15RoutingModule } from './gkcln15-routing.module';
import { GkCln15Component } from './gkcln15.component';

@NgModule({
  declarations: [
    GkCln15Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln15RoutingModule
  ]
})
export class GkCln15Module {
}
