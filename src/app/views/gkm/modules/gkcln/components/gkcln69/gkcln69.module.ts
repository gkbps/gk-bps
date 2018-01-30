import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln69Component } from './gkcln69.component';
import { GkCln69RoutingModule } from './gkcln69-routing.module';

@NgModule({
  declarations: [
    GkCln69Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln69RoutingModule
  ],
  exports: [
  ],
})
export class GkCln69Module {
}
