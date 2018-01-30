import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln57Component } from './gkcln57.component';
import { GkCln57RoutingModule } from './gkcln57-routing.module';

@NgModule({
  declarations: [
    GkCln57Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln57RoutingModule
  ],
  exports: [
  ],
})
export class GkCln57Module {
}
