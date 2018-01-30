import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln68Component } from './gkcln68.component';
import { GkCln68RoutingModule } from './gkcln68-routing.module';

@NgModule({
  declarations: [
    GkCln68Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln68RoutingModule
  ],
  exports: [
  ],
})
export class GkCln68Module {
}
