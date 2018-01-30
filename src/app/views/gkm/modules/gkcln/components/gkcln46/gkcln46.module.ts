import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoardModule } from '../../../../../../nga/components/hNavBoard';

import { GkCln46Component } from './gkcln46.component';
import { GkCln46RoutingModule } from './gkcln46-routing.module';

@NgModule({
  declarations: [
    GkCln46Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HNavBoardModule,
    GkCln46RoutingModule
  ],
  exports: [
  ],
})
export class GkCln46Module {
}
