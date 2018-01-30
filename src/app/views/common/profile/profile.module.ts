// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TabViewModule
} from 'primeng/primeng';

import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TabViewModule,

    NgaModule,
    // HoangModule,

    AppTranslationModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
  ],
})
export class ProfileModule { }
