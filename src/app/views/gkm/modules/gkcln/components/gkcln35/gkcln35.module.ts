import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln35Component } from './gkcln35.component';
import { GkCln35RoutingModule } from './gkcln35-routing.module';

@NgModule({
  declarations: [
    GkCln35Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln35RoutingModule
  ],
  exports: [
  ],
})
export class GkCln35Module {
}
