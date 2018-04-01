import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln40RoutingModule } from './gkcln40-routing.module';

import { GkCln40Component } from './gkcln40.component';

@NgModule({
  declarations: [
    GkCln40Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln40RoutingModule
  ]
})
export class GkCln40Module {
}
