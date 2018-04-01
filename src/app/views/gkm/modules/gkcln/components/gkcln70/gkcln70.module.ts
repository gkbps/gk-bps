import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln70RoutingModule } from './gkcln70-routing.module';

import { GkCln70Component } from './gkcln70.component';

@NgModule({
  declarations: [
    GkCln70Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln70RoutingModule
  ]
})
export class GkCln70Module {
}
