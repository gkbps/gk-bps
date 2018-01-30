import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { DynamicModule } from 'ng-dynamic-component';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln51Component } from './gkcln51.component';
import { GkCln51RoutingModule } from './gkcln51-routing.module';

import {
  // SharedModule,
  DropdownModule,
  ButtonModule,
  PanelModule,
  PickListModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    GkCln51Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    TranslateModule,

    DynamicModule,

    // SharedModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    PickListModule,

    HNavBoardModule,
    GkCln51RoutingModule
  ],
  exports: [
  ],
})
export class GkCln51Module {
}
