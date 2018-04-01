import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln60RoutingModule } from './gkcln60-routing.module';

import { GkCln60Component } from './gkcln60.component';

@NgModule({
  declarations: [
    GkCln60Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln60RoutingModule
  ]
})
export class GkCln60Module {
}
