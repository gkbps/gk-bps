import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../nga/components/hUploadForm';

import { GkCln21Component } from './gkcln21.component';
import { GkCln21RoutingModule } from './gkcln21-routing.module';

@NgModule({
  declarations: [
    GkCln21Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln21RoutingModule
  ],
  exports: [
  ],
})
export class GkCln21Module {
}
