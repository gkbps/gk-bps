import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln71Component } from './gkcln71.component';
import { GkCln71RoutingModule } from './gkcln71-routing.module';

@NgModule({
  declarations: [
    GkCln71Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln71RoutingModule
  ],
  exports: [
  ],
})
export class GkCln71Module {
}
