import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln45Component } from './gkcln45.component';
import { GkCln45RoutingModule } from './gkcln45-routing.module';

@NgModule({
  declarations: [
    GkCln45Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln45RoutingModule
  ],
  exports: [
  ],
})
export class GkCln45Module {
}
