import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln91Component } from './gkcln91.component';
import { GkCln91RoutingModule } from './gkcln91-routing.module';

@NgModule({
  declarations: [
    GkCln91Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln91RoutingModule
  ],
  exports: [
  ],
})
export class GkCln91Module {
}
