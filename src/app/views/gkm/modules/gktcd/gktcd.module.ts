import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/shared';
import { DataTableModule } from 'primeng/datatable';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';

import { NgaModule } from '../../../../nga/nga.module';
// import { HoangModule } from '../../../../nga/hoang.module';

import { HNavBoardModule } from '../../../../nga/components/hNavBoard';
import { HLeadFormModule } from '../../../../nga/components/hLeadForm';
import { HUploadFormModule } from '../../../../nga/components/hUploadForm';
import { HDownloadFormModule } from '../../../../nga/components/hDownloadForm';
import { HOverviewBoxHeaderModule } from '../../../../nga/components/hOverviewBoxHeader';

// import { GkTcdFormModule } from './components/gktcdForm/gktcdForm.module';

import { GkTcdComponent } from './gktcd.component';
import { GkTcdRoutingModule } from './gktcd-routing.module';

import { GkTcd00Component } from './components/gktcd00';
/*
import { GkTcd01Component } from './components/gktcd01';
*/

import { GkTcd10Component } from './components/gktcd10';
/*
import { GkTcd11Component } from './components/gktcd11';
import { GkTcd12Component } from './components/gktcd12';
*/
import { GkTcd20Component } from './components/gktcd20';
/*
import { GkTcd30Component } from './components/gktcd30';
import { GkTcd40Component } from './components/gktcd40';
*/
import { GkTcd50Component } from './components/gktcd50';
import { GkTcd60Component } from './components/gktcd60';
/*
import { GkTcd80Component } from './components/gktcd80';
import { GkTcd90Component } from './components/gktcd90';
*/

import { GkClientService } from '../../../../nga/common/gkClient.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GkTcdRoutingModule,

    DataTableModule,
    SharedModule,
    GrowlModule,
    ButtonModule,
    MultiSelectModule,
    ContextMenuModule,

    NgaModule,
    // HoangModule,

    HNavBoardModule,
		HLeadFormModule,
		HUploadFormModule,
    HDownloadFormModule,
		HOverviewBoxHeaderModule,

    // GkTcdFormModule,
  ],
  declarations: [
    GkTcdComponent,
    GkTcd00Component,
    /*
    GkTcd01Component,
    */
    GkTcd10Component,
    /*
    GkTcd11Component,
    GkTcd12Component,
    */
    GkTcd20Component,
    /*
    GkTcd30Component,

    GkTcd40Component,
    */
    GkTcd50Component,

    GkTcd60Component,
    /*
    GkTcd80Component,

    GkTcd90Component,
    */
  ],
  providers: [
    GkClientService,
  ],
})
export class GkTcdModule { }
