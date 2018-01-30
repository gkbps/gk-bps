import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln75Component } from './gkcln75.component';
import { GkCln75RoutingModule } from './gkcln75-routing.module';

@NgModule({
  declarations: [
    GkCln75Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln75RoutingModule
  ],
  exports: [
  ],
})
export class GkCln75Module {
}
