import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln36Component } from './gkcln36.component';
import { GkCln36RoutingModule } from './gkcln36-routing.module';

@NgModule({
  declarations: [
    GkCln36Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln36RoutingModule
  ],
  exports: [
  ],
})
export class GkCln36Module {
}
