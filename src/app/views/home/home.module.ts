import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Internal
import { NgaModule } from '../../nga/nga.module';
// import { HoangModule } from '../../nga/hoang.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // HoangModule,
    HomeRoutingModule,
  ],
  declarations: [ HomeComponent ],
  providers: [
  ],
})
export class HomeModule { }
