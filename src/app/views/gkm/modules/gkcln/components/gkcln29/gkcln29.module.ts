import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HHistoryModule } from '../../../../../../nga/components/hHistory';

import { GkCln29Component } from './gkcln29.component';
import { GkCln29RoutingModule } from './gkcln29-routing.module';

@NgModule({
  declarations: [
    GkCln29Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HHistoryModule,

    GkCln29RoutingModule
  ],
  exports: [
  ],
})
export class GkCln29Module {
}
