import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HNavigationBoardModule } from '../../../../../../ngh/modules/N0/hNavigationBoard';

import { GkCln00RoutingModule } from './gkcln00-routing.module';

import { GkCln00Component } from './gkcln00.component';

@NgModule({
  declarations: [
    GkCln00Component
  ],
  imports: [
    CommonModule,

    HNavigationBoardModule,

    GkCln00RoutingModule
  ]
})
export class GkCln00Module { }
