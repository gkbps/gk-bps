import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln86Component } from './gkcln86.component';
import { GkCln86RoutingModule } from './gkcln86-routing.module';

@NgModule({
  declarations: [
    GkCln86Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln86RoutingModule
  ],
  exports: [
  ],
})
export class GkCln86Module {
}
