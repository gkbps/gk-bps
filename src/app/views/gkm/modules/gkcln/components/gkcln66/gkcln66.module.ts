import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln66Component } from './gkcln66.component';
import { GkCln66RoutingModule } from './gkcln66-routing.module';

@NgModule({
  declarations: [
    GkCln66Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln66RoutingModule
  ],
  exports: [
  ],
})
export class GkCln66Module {
}
