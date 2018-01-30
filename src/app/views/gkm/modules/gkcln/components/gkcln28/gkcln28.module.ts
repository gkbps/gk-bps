import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../nga/components/hUploadForm';

import { GkCln28Component } from './gkcln28.component';
import { GkCln28RoutingModule } from './gkcln28-routing.module';

@NgModule({
  declarations: [
    GkCln28Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln28RoutingModule
  ],
  exports: [
  ],
})
export class GkCln28Module {
}
