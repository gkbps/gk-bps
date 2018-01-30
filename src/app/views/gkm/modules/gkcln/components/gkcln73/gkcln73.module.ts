import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln73Component } from './gkcln73.component';
import { GkCln73RoutingModule } from './gkcln73-routing.module';

@NgModule({
  declarations: [
    GkCln73Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln73RoutingModule
  ],
  exports: [
  ],
})
export class GkCln73Module {
}
