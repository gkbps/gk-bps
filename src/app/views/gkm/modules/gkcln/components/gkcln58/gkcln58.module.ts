import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln58Component } from './gkcln58.component';
import { GkCln58RoutingModule } from './gkcln58-routing.module';

@NgModule({
  declarations: [
    GkCln58Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln58RoutingModule
  ],
  exports: [
  ],
})
export class GkCln58Module {
}
