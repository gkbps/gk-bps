// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonModule,
  InputTextModule
} from 'primeng/primeng';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { P401RoutingModule } from './401-routing.module';
import { P401Component } from './401.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ButtonModule,
    InputTextModule,

    AppTranslationModule,
    P401RoutingModule,
  ],
  declarations: [
    P401Component,
  ],
  providers: [
  ],
})
export class P401Module {}
