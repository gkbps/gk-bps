import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln81Component } from './gkcln81.component';
import { GkCln81RoutingModule } from './gkcln81-routing.module';

@NgModule({
  declarations: [
    GkCln81Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln81RoutingModule
  ],
  exports: [
  ],
})
export class GkCln81Module {
}
