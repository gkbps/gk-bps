import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { GrowlModule } from 'primeng/growl';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DataTableModule } from 'primeng/datatable';

// Internal
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HToastySettingModule } from '../../../nga/components/hToastySetting';
import { HChangeDashboardModule } from '../../../nga/components/hChangeDashboard';
import { HContactFormModule } from '../../../nga/components/hContactForm';
import { HImageBoxModule } from '../../../nga/components/hImageBox';
import { HMapModule } from '../../../nga/components/hMap';
import { HMessageListModule } from '../../../nga/components/hMessageList';
import { HNavBoardModule } from '../../../nga/components/hNavBoard';
import { HOverviewBoxHeaderModule } from '../../../nga/components/hOverviewBoxHeader';
import { HStatusBarModule } from '../../../nga/components/hStatusBar';
import { HTaskBoxModule } from '../../../nga/components/hTaskBox';
import { HTaskListModule } from '../../../nga/components/hTaskList';
import { HUserCardModule } from '../../../nga/components/hUserCard';

import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    GrowlModule,
    MessagesModule,
    PanelModule,
    ChartModule,
    DataTableModule,

    NgaModule,
    // HoangModule,

    HToastySettingModule,
    HChangeDashboardModule,
    HContactFormModule,
    HImageBoxModule,
    HMapModule,
    HMessageListModule,
    HNavBoardModule,
    HOverviewBoxHeaderModule,
    HStatusBarModule,
    HTaskBoxModule,
    HTaskListModule,
    HUserCardModule,

    SettingRoutingModule,
  ],
  declarations: [ SettingComponent ],
  providers: [
  ],
})
export class SettingModule { }
