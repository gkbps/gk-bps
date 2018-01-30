import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln64Component } from './gkcln64.component';
import { GkCln64RoutingModule } from './gkcln64-routing.module';

@NgModule({
  declarations: [
    GkCln64Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln64RoutingModule
  ],
  exports: [
  ],
})
export class GkCln64Module {
}
