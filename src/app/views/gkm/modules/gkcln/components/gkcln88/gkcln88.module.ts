import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln88Component } from './gkcln88.component';
import { GkCln88RoutingModule } from './gkcln88-routing.module';

@NgModule({
  declarations: [
    GkCln88Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln88RoutingModule
  ],
  exports: [
  ],
})
export class GkCln88Module {
}
