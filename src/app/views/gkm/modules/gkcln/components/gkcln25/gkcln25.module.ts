import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../ngh/modules/2n/hUploadForm';

import { GkCln25Component } from './gkcln25.component';
import { GkCln25RoutingModule } from './gkcln25-routing.module';

@NgModule({
  declarations: [
    GkCln25Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln25RoutingModule
  ],
  exports: [
  ],
})
export class GkCln25Module {
}
