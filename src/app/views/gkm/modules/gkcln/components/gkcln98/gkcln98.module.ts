import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln98Component } from './gkcln98.component';
import { GkCln98RoutingModule } from './gkcln98-routing.module';

@NgModule({
  declarations: [
    GkCln98Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln98RoutingModule
  ],
  exports: [
  ],
})
export class GkCln98Module {
}
