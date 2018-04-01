import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln10RoutingModule } from './gkcln10-routing.module';

import { GkCln10Component } from './gkcln10.component';

@NgModule({
  declarations: [
    GkCln10Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln10RoutingModule
  ]
})
export class GkCln10Module {
}
