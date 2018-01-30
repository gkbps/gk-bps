import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln87Component } from './gkcln87.component';
import { GkCln87RoutingModule } from './gkcln87-routing.module';

@NgModule({
  declarations: [
    GkCln87Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln87RoutingModule
  ],
  exports: [
  ],
})
export class GkCln87Module {
}
