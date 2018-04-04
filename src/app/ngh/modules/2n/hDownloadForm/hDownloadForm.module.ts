import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HDownloadForm } from './hDownloadForm.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HDownloadForm
  ],
  imports: [
    CommonModule,

    TranslateModule,

    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HDownloadForm
  ],
})
export class HDownloadFormModule {
}
