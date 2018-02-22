import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

// import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln16Component } from './gkcln16.component';
import { GkCln16RoutingModule } from './gkcln16-routing.module';

import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

@NgModule({
  declarations: [
    GkCln16Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    // GkClnFormModule,
    GkClnSharedModule,

    GkCln16RoutingModule
  ],
  exports: [
  ],
})
export class GkCln16Module {
}
