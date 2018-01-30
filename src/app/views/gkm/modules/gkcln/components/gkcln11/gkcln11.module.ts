import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { GkClnFormModule } from '../gkclnForm/gkclnForm.module';
import { GkCln11Component } from './gkcln11.component';
import { GkCln11RoutingModule } from './gkcln11-routing.module';

@NgModule({
  declarations: [
    GkCln11Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    GkClnFormModule,
    GkCln11RoutingModule
  ],
  exports: [
  ],
})
export class GkCln11Module {
}
