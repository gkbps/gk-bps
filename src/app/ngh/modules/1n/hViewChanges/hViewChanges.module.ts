import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'primeng/shared';
import { PaginatorModule } from 'primeng/paginator';

import { HViewChanges } from './hViewChanges.component';

@NgModule({
  declarations: [
    HViewChanges
  ],
  imports: [
    CommonModule,

    TranslateModule,

    SharedModule,
    PaginatorModule,
  ],
  exports: [
    HViewChanges
  ],
})
export class HViewChangesModule {
}
