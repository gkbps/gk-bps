import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HDownloadForm } from './hDownloadForm.component';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HDownloadForm
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
    HDownloadForm
  ],
})
export class HDownloadFormModule {
}
