import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HContactFormComponent } from './hContactForm.component';

import {
  PanelModule,
  DropdownModule,
  InputTextModule,
  ButtonModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    HContactFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HContactFormComponent
  ],
})
export class HContactFormModule {
}
