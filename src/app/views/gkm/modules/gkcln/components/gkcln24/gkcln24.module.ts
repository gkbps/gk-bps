import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../ngh/modules/2n/hUploadForm';

import { GkCln24Component } from './gkcln24.component';
import { GkCln24RoutingModule } from './gkcln24-routing.module';

@NgModule({
  declarations: [
    GkCln24Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln24RoutingModule
  ],
  exports: [
  ],
})
export class GkCln24Module {
}
