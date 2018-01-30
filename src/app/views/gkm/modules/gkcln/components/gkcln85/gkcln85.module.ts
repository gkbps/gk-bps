import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln85Component } from './gkcln85.component';
import { GkCln85RoutingModule } from './gkcln85-routing.module';

@NgModule({
  declarations: [
    GkCln85Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln85RoutingModule
  ],
  exports: [
  ],
})
export class GkCln85Module {
}
