// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln12Component } from './gkcln12.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln12Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view'
    },
  },
  {
    path: ':id',
    component: GkCln12Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln12RoutingModule {}
