import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AlHistoryComponent } from './alHistory.component';

@NgModule({
  declarations: [
    AlHistoryComponent
  ],
  imports: [
    CommonModule,

    TranslateModule,
  ],
  exports: [
    AlHistoryComponent
  ],
})
export class AlHistoryModule {
}
