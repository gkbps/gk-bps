import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln79Component } from './gkcln79.component';
import { GkCln79RoutingModule } from './gkcln79-routing.module';

@NgModule({
  declarations: [
    GkCln79Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln79RoutingModule
  ],
  exports: [
  ],
})
export class GkCln79Module {
}
