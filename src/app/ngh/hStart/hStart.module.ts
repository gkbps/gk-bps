import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { PanelModule } from 'primeng/panel';

import { HStartComponent } from './hStart.component';

@NgModule({
  declarations: [
    HStartComponent
  ],
  imports: [
    CommonModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,

    PanelModule
  ],
  exports: [
    HStartComponent
  ],
})
export class HStartModule {
}
