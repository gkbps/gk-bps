import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln76Component } from './gkcln76.component';
import { GkCln76RoutingModule } from './gkcln76-routing.module';

@NgModule({
  declarations: [
    GkCln76Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln76RoutingModule
  ],
  exports: [
  ],
})
export class GkCln76Module {
}
