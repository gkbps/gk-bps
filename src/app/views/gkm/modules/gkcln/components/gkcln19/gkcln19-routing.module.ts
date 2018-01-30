// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln19Component } from './gkcln19.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln19Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view_change'
    },
  },
  {
    path: ':id',
    component: GkCln19Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view_change'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln19RoutingModule {}
