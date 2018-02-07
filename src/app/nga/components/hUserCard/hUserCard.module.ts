import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { TranslateModule } from '@ngx-translate/core';

import { HUserCardComponent } from './hUserCard.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HUserCardComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    // TranslateModule,

    ButtonModule,
  ],
  exports: [
    HUserCardComponent
  ],
})
export class HUserCardModule {
}
