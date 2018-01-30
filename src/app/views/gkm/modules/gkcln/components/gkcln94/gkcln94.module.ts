import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln94Component } from './gkcln94.component';
import { GkCln94RoutingModule } from './gkcln94-routing.module';

@NgModule({
  declarations: [
    GkCln94Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln94RoutingModule
  ],
  exports: [
  ],
})
export class GkCln94Module {
}
