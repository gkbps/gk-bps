import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln59Component } from './gkcln59.component';
import { GkCln59RoutingModule } from './gkcln59-routing.module';

@NgModule({
  declarations: [
    GkCln59Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln59RoutingModule
  ],
  exports: [
  ],
})
export class GkCln59Module {
}
