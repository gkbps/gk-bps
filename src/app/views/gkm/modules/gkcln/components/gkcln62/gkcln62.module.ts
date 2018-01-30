import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln62Component } from './gkcln62.component';
import { GkCln62RoutingModule } from './gkcln62-routing.module';

@NgModule({
  declarations: [
    GkCln62Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln62RoutingModule
  ],
  exports: [
  ],
})
export class GkCln62Module {
}
