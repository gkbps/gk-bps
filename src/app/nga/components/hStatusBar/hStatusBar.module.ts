import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { TranslateModule } from '@ngx-translate/core';

import { HStatusBarComponent } from './hStatusBar.component';

@NgModule({
  declarations: [
    HStatusBarComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    // TranslateModule,

  ],
  exports: [
    HStatusBarComponent
  ],
})
export class HStatusBarModule {
}
