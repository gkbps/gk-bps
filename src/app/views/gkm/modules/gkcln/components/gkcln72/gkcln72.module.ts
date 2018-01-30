import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln72Component } from './gkcln72.component';
import { GkCln72RoutingModule } from './gkcln72-routing.module';

@NgModule({
  declarations: [
    GkCln72Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln72RoutingModule
  ],
  exports: [
  ],
})
export class GkCln72Module {
}
