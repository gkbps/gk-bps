import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln40Component } from './gkcln40.component';
import { GkCln40RoutingModule } from './gkcln40-routing.module';

@NgModule({
  declarations: [
    GkCln40Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln40RoutingModule
  ],
  exports: [
  ],
})
export class GkCln40Module {
}
