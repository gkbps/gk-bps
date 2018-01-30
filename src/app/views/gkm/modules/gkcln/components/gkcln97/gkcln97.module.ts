import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln97Component } from './gkcln97.component';
import { GkCln97RoutingModule } from './gkcln97-routing.module';

@NgModule({
  declarations: [
    GkCln97Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln97RoutingModule
  ],
  exports: [
  ],
})
export class GkCln97Module {
}
