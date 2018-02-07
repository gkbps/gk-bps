import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln10Component } from './gkcln10.component';
import { GkCln10RoutingModule } from './gkcln10-routing.module';

@NgModule({
  declarations: [
    GkCln10Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln10RoutingModule
  ],
  exports: [
  ],
})
export class GkCln10Module {
}
