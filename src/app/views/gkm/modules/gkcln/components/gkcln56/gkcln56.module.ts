import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln56Component } from './gkcln56.component';
import { GkCln56RoutingModule } from './gkcln56-routing.module';

@NgModule({
  declarations: [
    GkCln56Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln56RoutingModule
  ],
  exports: [
  ],
})
export class GkCln56Module {
}
