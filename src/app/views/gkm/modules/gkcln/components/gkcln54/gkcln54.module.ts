import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln54Component } from './gkcln54.component';
import { GkCln54RoutingModule } from './gkcln54-routing.module';

@NgModule({
  declarations: [
    GkCln54Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln54RoutingModule
  ],
  exports: [
  ],
})
export class GkCln54Module {
}
