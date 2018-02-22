import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HToastySettingComponent } from './hToastySetting.component';

import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    HToastySettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    PanelModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    HToastySettingComponent
  ],
})
export class HToastySettingModule {
}
