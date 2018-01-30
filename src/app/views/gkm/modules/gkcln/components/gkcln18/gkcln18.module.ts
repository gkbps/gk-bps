import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln18Component } from './gkcln18.component';
import { GkCln18RoutingModule } from './gkcln18-routing.module';

@NgModule({
  declarations: [
    GkCln18Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    GkClnFormModule,
    GkCln18RoutingModule
  ],
  exports: [
  ],
})
export class GkCln18Module {
}
