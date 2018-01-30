import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln33Component } from './gkcln33.component';
import { GkCln33RoutingModule } from './gkcln33-routing.module';

@NgModule({
  declarations: [
    GkCln33Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln33RoutingModule
  ],
  exports: [
  ],
})
export class GkCln33Module {
}
