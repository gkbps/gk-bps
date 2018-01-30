import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln96Component } from './gkcln96.component';
import { GkCln96RoutingModule } from './gkcln96-routing.module';

@NgModule({
  declarations: [
    GkCln96Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln96RoutingModule
  ],
  exports: [
  ],
})
export class GkCln96Module {
}
