import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadForm } from './hLeadForm.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HLeadForm
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HLeadForm
  ],
})
export class HLeadFormModule {
}
