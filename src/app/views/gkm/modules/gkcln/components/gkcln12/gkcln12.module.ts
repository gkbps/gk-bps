import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

// import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln12Component } from './gkcln12.component';
import { GkCln12RoutingModule } from './gkcln12-routing.module';

import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

@NgModule({
  declarations: [
    GkCln12Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    // GkClnFormModule,
    GkClnSharedModule,

    GkCln12RoutingModule
  ],
  exports: [
  ],
})
export class GkCln12Module {
}
