import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln39Component } from './gkcln39.component';
import { GkCln39RoutingModule } from './gkcln39-routing.module';

@NgModule({
  declarations: [
    GkCln39Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln39RoutingModule
  ],
  exports: [
  ],
})
export class GkCln39Module {
}
