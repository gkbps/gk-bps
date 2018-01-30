import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln67Component } from './gkcln67.component';
import { GkCln67RoutingModule } from './gkcln67-routing.module';

@NgModule({
  declarations: [
    GkCln67Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln67RoutingModule
  ],
  exports: [
  ],
})
export class GkCln67Module {
}
