import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorModule } from 'primeng/paginator';

import { TranslateModule } from '@ngx-translate/core';

import { HHistory } from './hHistory.component';

@NgModule({
  declarations: [
    HHistory
  ],
  imports: [
    CommonModule,

    PaginatorModule,

    TranslateModule,
  ],
  exports: [
    HHistory
  ],
})
export class HHistoryModule {
}
