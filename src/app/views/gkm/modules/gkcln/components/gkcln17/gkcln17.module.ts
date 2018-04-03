import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

import { GkCln17RoutingModule } from './gkcln17-routing.module';
import { GkCln17Component } from './gkcln17.component';

@NgModule({
  declarations: [
    GkCln17Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,

    GkClnSharedModule,

    GkCln17RoutingModule
  ]
})
export class GkCln17Module {
}
