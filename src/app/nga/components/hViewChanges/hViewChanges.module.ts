import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HViewChanges } from './hViewChanges.component';

import { SharedModule } from 'primeng/shared';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    HViewChanges
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

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
