import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../nga/components/hUploadForm';

import { GkCln26Component } from './gkcln26.component';
import { GkCln26RoutingModule } from './gkcln26-routing.module';

@NgModule({
  declarations: [
    GkCln26Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln26RoutingModule
  ],
  exports: [
  ],
})
export class GkCln26Module {
}
