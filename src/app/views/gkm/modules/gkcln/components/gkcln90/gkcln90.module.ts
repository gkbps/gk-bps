import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln90RoutingModule } from './gkcln90-routing.module';

import { GkCln90Component } from './gkcln90.component';

@NgModule({
  declarations: [
    GkCln90Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln90RoutingModule
  ]
})
export class GkCln90Module {
}
