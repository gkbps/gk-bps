import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HUploadForm } from './hUploadForm.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HUploadForm
  ],
  imports: [
    CommonModule,

    TranslateModule,

    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HUploadForm
  ],
})
export class HUploadFormModule {
}
