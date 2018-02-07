import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HNavBoard } from './hNavBoard.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

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
  ],
  exports: [
    HNavBoard
  ],
})
export class HNavBoardModule {
}
