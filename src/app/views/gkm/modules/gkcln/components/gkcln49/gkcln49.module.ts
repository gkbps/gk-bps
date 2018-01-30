import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln49Component } from './gkcln49.component';
import { GkCln49RoutingModule } from './gkcln49-routing.module';

@NgModule({
  declarations: [
    GkCln49Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln49RoutingModule
  ],
  exports: [
  ],
})
export class GkCln49Module {
}
