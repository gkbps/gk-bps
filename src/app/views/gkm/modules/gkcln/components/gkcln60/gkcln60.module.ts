import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln60Component } from './gkcln60.component';
import { GkCln60RoutingModule } from './gkcln60-routing.module';

@NgModule({
  declarations: [
    GkCln60Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln60RoutingModule
  ],
  exports: [
  ],
})
export class GkCln60Module {
}
