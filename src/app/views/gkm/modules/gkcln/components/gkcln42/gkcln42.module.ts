import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln42Component } from './gkcln42.component';
import { GkCln42RoutingModule } from './gkcln42-routing.module';

@NgModule({
  declarations: [
    GkCln42Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln42RoutingModule
  ],
  exports: [
  ],
})
export class GkCln42Module {
}
