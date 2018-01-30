import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln44Component } from './gkcln44.component';
import { GkCln44RoutingModule } from './gkcln44-routing.module';

@NgModule({
  declarations: [
    GkCln44Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln44RoutingModule
  ],
  exports: [
  ],
})
export class GkCln44Module {
}
