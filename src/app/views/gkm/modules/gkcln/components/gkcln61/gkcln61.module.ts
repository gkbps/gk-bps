import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln61Component } from './gkcln61.component';
import { GkCln61RoutingModule } from './gkcln61-routing.module';

@NgModule({
  declarations: [
    GkCln61Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln61RoutingModule
  ],
  exports: [
  ],
})
export class GkCln61Module {
}
