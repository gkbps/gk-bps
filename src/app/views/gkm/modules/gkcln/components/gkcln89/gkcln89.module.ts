import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln89Component } from './gkcln89.component';
import { GkCln89RoutingModule } from './gkcln89-routing.module';

@NgModule({
  declarations: [
    GkCln89Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln89RoutingModule
  ],
  exports: [
  ],
})
export class GkCln89Module {
}
