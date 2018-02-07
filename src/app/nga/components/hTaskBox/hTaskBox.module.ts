import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HTaskBoxComponent } from './hTaskBox.component';

@NgModule({
  declarations: [
    HTaskBoxComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

  ],
  exports: [
    HTaskBoxComponent
  ],
})
export class HTaskBoxModule {
}
