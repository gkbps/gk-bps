import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln00Component } from './gkcln00.component';
import { GkCln00RoutingModule } from './gkcln00-routing.module';

@NgModule({
  declarations: [
    GkCln00Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln00RoutingModule
  ],
  exports: [
  ],
})
export class GkCln00Module {
}
