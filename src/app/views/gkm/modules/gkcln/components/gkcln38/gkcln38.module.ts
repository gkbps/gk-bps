import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln38Component } from './gkcln38.component';
import { GkCln38RoutingModule } from './gkcln38-routing.module';

@NgModule({
  declarations: [
    GkCln38Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln38RoutingModule
  ],
  exports: [
  ],
})
export class GkCln38Module {
}
