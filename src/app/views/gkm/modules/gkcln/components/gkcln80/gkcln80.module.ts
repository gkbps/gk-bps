import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln80RoutingModule } from './gkcln80-routing.module';

import { GkCln80Component } from './gkcln80.component';

@NgModule({
  declarations: [
    GkCln80Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln80RoutingModule
  ]
})
export class GkCln80Module {
}
