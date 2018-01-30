import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln82Component } from './gkcln82.component';
import { GkCln82RoutingModule } from './gkcln82-routing.module';

@NgModule({
  declarations: [
    GkCln82Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln82RoutingModule
  ],
  exports: [
  ],
})
export class GkCln82Module {
}
