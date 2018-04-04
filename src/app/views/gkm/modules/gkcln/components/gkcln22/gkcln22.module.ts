import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { TranslateModule } from '@ngx-translate/core';

import { HDownloadFormModule } from '../../../../../../ngh/modules/2n/hDownloadForm';

import { GkCln22Component } from './gkcln22.component';
import { GkCln22RoutingModule } from './gkcln22-routing.module';

@NgModule({
  declarations: [
    GkCln22Component
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,

    // TranslateModule,

    HDownloadFormModule,

    GkCln22RoutingModule
  ],
  exports: [
  ],
})
export class GkCln22Module {
}
