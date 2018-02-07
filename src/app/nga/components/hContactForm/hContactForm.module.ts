import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HContactFormComponent } from './hContactForm.component';

import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
