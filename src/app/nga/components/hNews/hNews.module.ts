import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HNewsComponent } from './hNews.component';

import {
  PanelModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HNewsComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    TranslateModule,

    PanelModule,
  ],
  exports: [
    HNewsComponent
  ],
})
export class HNewsModule {
}
