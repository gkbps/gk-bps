import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HHistoryModule } from '../../../../../../ngh/modules/2n/hHistory';

import { GkCln29RoutingModule } from './gkcln29-routing.module';
import { GkCln29Component } from './gkcln29.component';

@NgModule({
  declarations: [
    GkCln29Component
  ],
  imports: [
    CommonModule,

    TranslateModule,

    HHistoryModule,

    GkCln29RoutingModule
  ]
})
export class GkCln29Module {
}
