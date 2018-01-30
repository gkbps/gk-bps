import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { TranslateModule } from '@ngx-translate/core';

import { HUserCardComponent } from './hUserCard.component';

import {
  // PanelModule,
  // InputTextModule,
  ButtonModule,
} from 'primeng/primeng';

@NgModule({
  declarations: [
    HUserCardComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    // TranslateModule,

    // PanelModule,
    // InputTextModule,
    ButtonModule,
  ],
  exports: [
    HUserCardComponent
  ],
})
export class HUserCardModule {
}
