import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Internal
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../nga/hoang.module';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // HoangModule,
    AboutRoutingModule,
  ],
  declarations: [ AboutComponent ],
  providers: [
  ],
})
export class AboutModule { }
