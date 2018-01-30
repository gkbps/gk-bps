import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln83Component } from './gkcln83.component';
import { GkCln83RoutingModule } from './gkcln83-routing.module';

@NgModule({
  declarations: [
    GkCln83Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln83RoutingModule
  ],
  exports: [
  ],
})
export class GkCln83Module {
}
