import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln52Component } from './gkcln52.component';
import { GkCln52RoutingModule } from './gkcln52-routing.module';

import { HChartDoughnutModule } from '../../../../../../nga/components/hChartDoughnut';

@NgModule({
  declarations: [
    GkCln52Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,

    TranslateModule,

    HChartDoughnutModule,

    HNavBoardModule,
    GkCln52RoutingModule
  ],
  exports: [
  ],
})
export class GkCln52Module {
}
