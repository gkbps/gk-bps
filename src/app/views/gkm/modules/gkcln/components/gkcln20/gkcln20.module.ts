import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln20RoutingModule } from './gkcln20-routing.module';

import { GkCln20Component } from './gkcln20.component';

@NgModule({
  declarations: [
    GkCln20Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln20RoutingModule
  ]
})
export class GkCln20Module {
}
