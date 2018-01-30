import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln17Component } from './gkcln17.component';
import { GkCln17RoutingModule } from './gkcln17-routing.module';

@NgModule({
  declarations: [
    GkCln17Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    GkClnFormModule,
    GkCln17RoutingModule
  ],
  exports: [
  ],
})
export class GkCln17Module {
}
