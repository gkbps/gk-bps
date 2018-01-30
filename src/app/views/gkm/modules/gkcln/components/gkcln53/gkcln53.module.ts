import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln53Component } from './gkcln53.component';
import { GkCln53RoutingModule } from './gkcln53-routing.module';

@NgModule({
  declarations: [
    GkCln53Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln53RoutingModule
  ],
  exports: [
  ],
})
export class GkCln53Module {
}
