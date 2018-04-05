import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HUploadFormModule } from '../../../../../../ngh/modules/2n/hUploadForm';

import { GkCln27Component } from './gkcln27.component';
import { GkCln27RoutingModule } from './gkcln27-routing.module';

@NgModule({
  declarations: [
    GkCln27Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HUploadFormModule,

    GkCln27RoutingModule
  ],
  exports: [
  ],
})
export class GkCln27Module {
}
