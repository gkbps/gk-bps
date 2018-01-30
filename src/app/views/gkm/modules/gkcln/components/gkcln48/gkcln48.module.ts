import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln48Component } from './gkcln48.component';
import { GkCln48RoutingModule } from './gkcln48-routing.module';

@NgModule({
  declarations: [
    GkCln48Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln48RoutingModule
  ],
  exports: [
  ],
})
export class GkCln48Module {
}
