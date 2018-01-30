import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln41Component } from './gkcln41.component';
import { GkCln41RoutingModule } from './gkcln41-routing.module';

@NgModule({
  declarations: [
    GkCln41Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln41RoutingModule
  ],
  exports: [
  ],
})
export class GkCln41Module {
}
