import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln77Component } from './gkcln77.component';
import { GkCln77RoutingModule } from './gkcln77-routing.module';

@NgModule({
  declarations: [
    GkCln77Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln77RoutingModule
  ],
  exports: [
  ],
})
export class GkCln77Module {
}
