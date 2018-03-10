import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NtfctComponent } from './ntfct.component';

const routes: Routes = [
  {
    path: '',
    component: NtfctComponent,
    data: {
      title: 'ntfct'
    }
  },
  {
    path: ':id',
    component: NtfctComponent,
    data: {
      title: 'ntfct'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NtfctRoutingModule {}
