import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln14Component } from './gkcln14.component';
import { GkCln14RoutingModule } from './gkcln14-routing.module';

@NgModule({
  declarations: [
    GkCln14Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    GkClnFormModule,
    GkCln14RoutingModule
  ],
  exports: [
  ],
})
export class GkCln14Module {
}
