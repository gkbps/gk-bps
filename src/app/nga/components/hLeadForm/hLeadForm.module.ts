import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HLeadForm } from './hLeadForm.component';

import {
  PanelModule,
  InputTextModule,
  ButtonModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    HLeadForm
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule,

    TranslateModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HLeadForm
  ],
})
export class HLeadFormModule {
}
