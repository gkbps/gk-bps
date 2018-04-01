import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln50RoutingModule } from './gkcln50-routing.module';

import { GkCln50Component } from './gkcln50.component';

@NgModule({
  declarations: [
    GkCln50Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln50RoutingModule
  ]
})
export class GkCln50Module {
}
