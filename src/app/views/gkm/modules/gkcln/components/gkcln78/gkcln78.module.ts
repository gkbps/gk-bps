import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln78Component } from './gkcln78.component';
import { GkCln78RoutingModule } from './gkcln78-routing.module';

@NgModule({
  declarations: [
    GkCln78Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln78RoutingModule
  ],
  exports: [
  ],
})
export class GkCln78Module {
}
