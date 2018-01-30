import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictComponent } from './dict.component';

const routes: Routes = [
  {
    path: '',
    component: DictComponent,
    data: {
      title: 'app_dictionary'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictRoutingModule {}
