import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../ngh/modules/1n/hLeadForm';
import { HViewChangesModule } from '../../../../../../ngh/modules/1n/hViewChanges';

import { GkCln19RoutingModule } from './gkcln19-routing.module';
import { GkCln19Component } from './gkcln19.component';

@NgModule({
  declarations: [
    GkCln19Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HLeadFormModule,
    HViewChangesModule,

    GkCln19RoutingModule
  ]
})
export class GkCln19Module {
}
