import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HNewsComponent } from './hNews.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    HNewsComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    PanelModule,
  ],
  exports: [
    HNewsComponent
  ],
})
export class HNewsModule {
}
