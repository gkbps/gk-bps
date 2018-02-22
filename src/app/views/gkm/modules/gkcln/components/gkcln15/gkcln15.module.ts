import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';

// import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln15Component } from './gkcln15.component';
import { GkCln15RoutingModule } from './gkcln15-routing.module';

import { GkClnSharedModule } from '../gkclnShared/gkclnShared.module';

@NgModule({
  declarations: [
    GkCln15Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,

    // GkClnFormModule,
    GkClnSharedModule,

    GkCln15RoutingModule
  ],
  exports: [
  ],
})
export class GkCln15Module {
}
