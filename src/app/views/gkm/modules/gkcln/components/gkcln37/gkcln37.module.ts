import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln37Component } from './gkcln37.component';
import { GkCln37RoutingModule } from './gkcln37-routing.module';

@NgModule({
  declarations: [
    GkCln37Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln37RoutingModule
  ],
  exports: [
  ],
})
export class GkCln37Module {
}
