import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsDeptComponent } from './components/department';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    data: {
      title: 'News'
    }
  },
  {
    path: 'dept',
    component: NewsDeptComponent,
    data: {
      title: 'News'
    }
  },
  {
    path: 'dept/:id',
    component: NewsDeptComponent,
    data: {
      title: 'News'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
