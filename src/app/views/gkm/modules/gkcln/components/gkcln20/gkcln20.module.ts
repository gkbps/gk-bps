import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln20Component } from './gkcln20.component';
import { GkCln20RoutingModule } from './gkcln20-routing.module';

@NgModule({
  declarations: [
    GkCln20Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HNavBoardModule,
    GkCln20RoutingModule
  ],
  exports: [
  ],
})
export class GkCln20Module {
}
