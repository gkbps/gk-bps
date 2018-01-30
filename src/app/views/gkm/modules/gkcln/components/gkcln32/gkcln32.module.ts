import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln32Component } from './gkcln32.component';
import { GkCln32RoutingModule } from './gkcln32-routing.module';

@NgModule({
  declarations: [
    GkCln32Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln32RoutingModule
  ],
  exports: [
  ],
})
export class GkCln32Module {
}
