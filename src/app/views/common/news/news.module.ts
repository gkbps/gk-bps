import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Internal
import { NgaModule } from '../../../nga/nga.module';
// import { HoangModule } from '../../../nga/hoang.module';

import { HNewsModule } from '../../../nga/components/hNews';

import { NewsComponent } from './news.component';
import { NewsDeptComponent } from './components/department';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // HoangModule,
    HNewsModule,

    NewsRoutingModule,
  ],
  declarations: [
    NewsComponent,
    NewsDeptComponent,
  ],
  providers: [
  ],
})
export class NewsModule { }
