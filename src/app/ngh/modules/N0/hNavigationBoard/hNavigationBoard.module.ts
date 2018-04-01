import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { TranslateModule } from '@ngx-translate/core';

import { HNavigationBoard } from './hNavigationBoard.component';

@NgModule({
  declarations: [
    HNavigationBoard
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    ToolbarModule,
    TooltipModule,

    TranslateModule,
  ],
  exports: [
    HNavigationBoard
  ],
})
export class HNavigationBoardModule {
}
