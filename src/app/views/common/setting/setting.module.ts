import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

// Internal
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HToastySettingModule } from '../../../nga/components/hToastySetting';

import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,

    NgaModule,
    // HoangModule,

    HToastySettingModule,

    SettingRoutingModule,
  ],
  declarations: [ SettingComponent ],
  providers: [
  ],
})
export class SettingModule { }
