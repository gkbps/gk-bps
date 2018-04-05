import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HUploadFormModule } from '../../../../../../ngh/modules/2n/hUploadForm';

import { GkCln21Component } from './gkcln21.component';
import { GkCln21RoutingModule } from './gkcln21-routing.module';

@NgModule({
  declarations: [
    GkCln21Component
  ],
  imports: [
    CommonModule,

    HUploadFormModule,

    GkCln21RoutingModule
  ],
  exports: [
  ],
})
export class GkCln21Module {
}
