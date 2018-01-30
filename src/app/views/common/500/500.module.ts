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

import { P500RoutingModule } from './500-routing.module';
import { P500Component } from './500.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    ButtonModule,
    InputTextModule,

    AppTranslationModule,
    P500RoutingModule,
  ],
  declarations: [
    P500Component,
  ],
  providers: [
  ],
})
export class P500Module {}
