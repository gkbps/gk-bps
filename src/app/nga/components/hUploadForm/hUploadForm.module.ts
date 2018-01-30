import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HUploadForm } from './hUploadForm.component';

import {
  PanelModule,
  InputTextModule,
  ButtonModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HUploadForm
  ],
  imports: [
    CommonModule,
    // FormsModule,

    TranslateModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HUploadForm
  ],
})
export class HUploadFormModule {
}
