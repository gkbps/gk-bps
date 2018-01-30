import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln65Component } from './gkcln65.component';
import { GkCln65RoutingModule } from './gkcln65-routing.module';

@NgModule({
  declarations: [
    GkCln65Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln65RoutingModule
  ],
  exports: [
  ],
})
export class GkCln65Module {
}
