import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoard } from './hNavBoard.component';

import {
  ToolbarModule,
  ButtonModule,
  TooltipModule,
  // PanelModule,
  // DropdownModule,
  // InputTextModule,

} from 'primeng/primeng';

@NgModule({
  declarations: [
    HNavBoard
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TranslateModule,

    ToolbarModule,
    ButtonModule,
    TooltipModule,
    // PanelModule,
    // DropdownModule,
    // InputTextModule,
  ],
  exports: [
    HNavBoard
  ],
})
export class HNavBoardModule {
}
