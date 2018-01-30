import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln99Component } from './gkcln99.component';
import { GkCln99RoutingModule } from './gkcln99-routing.module';

@NgModule({
  declarations: [
    GkCln99Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln99RoutingModule
  ],
  exports: [
  ],
})
export class GkCln99Module {
}
