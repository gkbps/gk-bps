import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import {
  DataListModule,
  InputTextModule,
  ButtonModule,
  PanelModule,
  TabViewModule,
  ConfirmDialogModule
} from 'primeng/primeng';

import { ConfirmationService } from 'primeng/primeng';

import { HChatComponent } from './hChat.component';

@NgModule({
  declarations: [
    HChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    DataListModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    TabViewModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    HChatComponent
  ],
})
export class HChatModule {
}
