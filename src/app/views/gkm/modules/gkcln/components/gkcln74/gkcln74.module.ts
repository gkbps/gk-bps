import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln74Component } from './gkcln74.component';
import { GkCln74RoutingModule } from './gkcln74-routing.module';

@NgModule({
  declarations: [
    GkCln74Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln74RoutingModule
  ],
  exports: [
  ],
})
export class GkCln74Module {
}
