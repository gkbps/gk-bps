import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln95Component } from './gkcln95.component';
import { GkCln95RoutingModule } from './gkcln95-routing.module';

@NgModule({
  declarations: [
    GkCln95Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln95RoutingModule
  ],
  exports: [
  ],
})
export class GkCln95Module {
}
