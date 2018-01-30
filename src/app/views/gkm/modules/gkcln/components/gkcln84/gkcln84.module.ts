import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln84Component } from './gkcln84.component';
import { GkCln84RoutingModule } from './gkcln84-routing.module';

@NgModule({
  declarations: [
    GkCln84Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln84RoutingModule
  ],
  exports: [
  ],
})
export class GkCln84Module {
}
