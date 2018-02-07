import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DataListModule } from 'primeng/datalist';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';

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
