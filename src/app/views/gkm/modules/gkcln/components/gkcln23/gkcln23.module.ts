import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../nga/components/hUploadForm';

import { GkCln23Component } from './gkcln23.component';
import { GkCln23RoutingModule } from './gkcln23-routing.module';

@NgModule({
  declarations: [
    GkCln23Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln23RoutingModule
  ],
  exports: [
  ],
})
export class GkCln23Module {
}
