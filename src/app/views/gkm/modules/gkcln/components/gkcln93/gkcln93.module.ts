import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln93Component } from './gkcln93.component';
import { GkCln93RoutingModule } from './gkcln93-routing.module';

@NgModule({
  declarations: [
    GkCln93Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln93RoutingModule
  ],
  exports: [
  ],
})
export class GkCln93Module {
}
