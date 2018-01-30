import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HAddress } from './hAddress.component';

import {
  PanelModule,
  InputTextModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HAddress
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    PanelModule,
    InputTextModule,
  ],
  exports: [
    HAddress
  ],
})
export class HAddressModule {
}
