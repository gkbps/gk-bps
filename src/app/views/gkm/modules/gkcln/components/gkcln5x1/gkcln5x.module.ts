import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { DynamicModule } from 'ng-dynamic-component';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln5xComponent } from './gkcln5x.component';
import { GkCln5xRoutingModule } from './gkcln5x-routing.module';
import { GkCln5xService } from './gkcln5x.service';

import {
  // SharedModule,
  DropdownModule,
  ButtonModule,
  PanelModule,
  PickListModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    GkCln5xComponent
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
    GkCln5xRoutingModule
  ],
  exports: [
  ],
  providers: [
    GkCln5xService
  ]
})
export class GkCln5xModule {
}
