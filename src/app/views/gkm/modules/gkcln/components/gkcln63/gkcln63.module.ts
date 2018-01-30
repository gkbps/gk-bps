import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln63Component } from './gkcln63.component';
import { GkCln63RoutingModule } from './gkcln63-routing.module';

@NgModule({
  declarations: [
    GkCln63Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln63RoutingModule
  ],
  exports: [
  ],
})
export class GkCln63Module {
}
