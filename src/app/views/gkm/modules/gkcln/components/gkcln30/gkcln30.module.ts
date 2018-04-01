import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln30RoutingModule } from './gkcln30-routing.module';

import { GkCln30Component } from './gkcln30.component';

@NgModule({
  declarations: [
    GkCln30Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln30RoutingModule
  ]
})
export class GkCln30Module {
}
