import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln43Component } from './gkcln43.component';
import { GkCln43RoutingModule } from './gkcln43-routing.module';

@NgModule({
  declarations: [
    GkCln43Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln43RoutingModule
  ],
  exports: [
  ],
})
export class GkCln43Module {
}
