import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AlBoxComponent } from './alBox.component';

@NgModule({
  declarations: [
    AlBoxComponent
  ],
  imports: [
    CommonModule,

    TranslateModule,
  ],
  exports: [
    AlBoxComponent
  ],
})
export class AlBoxModule {
}
