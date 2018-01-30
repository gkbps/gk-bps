// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln15Component } from './gkcln15.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln15Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'enable'
    },
  },
  {
    path: ':id',
    component: GkCln15Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'enable'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln15RoutingModule {}
