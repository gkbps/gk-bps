import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HHistory } from './hHistory.component';

import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    HHistory
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    TranslateModule,

    PaginatorModule,
  ],
  exports: [
    HHistory
  ],
})
export class HHistoryModule {
}
