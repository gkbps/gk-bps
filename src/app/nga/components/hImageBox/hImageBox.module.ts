import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { TranslateModule } from '@ngx-translate/core';

import { HImageBoxComponent } from './hImageBox.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HImageBoxComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    // TranslateModule,

    ButtonModule,
  ],
  exports: [
    HImageBoxComponent
  ],
})
export class HImageBoxModule {
}
