import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadFormModule } from '../../../../../../nga/components/hLeadForm';
import { HViewChangesModule } from '../../../../../../nga/components/hViewChanges';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln19Component } from './gkcln19.component';
import { GkCln19RoutingModule } from './gkcln19-routing.module';

@NgModule({
  declarations: [
    GkCln19Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    HLeadFormModule,
    HViewChangesModule,
    
    GkClnFormModule,
    GkCln19RoutingModule
  ],
  exports: [
  ],
})
export class GkCln19Module {
}
