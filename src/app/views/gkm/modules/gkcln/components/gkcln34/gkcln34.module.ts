import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln34Component } from './gkcln34.component';
import { GkCln34RoutingModule } from './gkcln34-routing.module';

@NgModule({
  declarations: [
    GkCln34Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln34RoutingModule
  ],
  exports: [
  ],
})
export class GkCln34Module {
}
