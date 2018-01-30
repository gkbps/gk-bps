import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln47Component } from './gkcln47.component';
import { GkCln47RoutingModule } from './gkcln47-routing.module';

@NgModule({
  declarations: [
    GkCln47Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln47RoutingModule
  ],
  exports: [
  ],
})
export class GkCln47Module {
}
