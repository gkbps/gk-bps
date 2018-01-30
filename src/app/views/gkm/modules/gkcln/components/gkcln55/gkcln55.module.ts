import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln55Component } from './gkcln55.component';
import { GkCln55RoutingModule } from './gkcln55-routing.module';

@NgModule({
  declarations: [
    GkCln55Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln55RoutingModule
  ],
  exports: [
  ],
})
export class GkCln55Module {
}
