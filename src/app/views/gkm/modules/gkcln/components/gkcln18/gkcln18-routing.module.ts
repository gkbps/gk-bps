// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln18Component } from './gkcln18.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln18Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'delete'
    },
  },
  {
    path: ':id',
    component: GkCln18Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'delete'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln18RoutingModule {}
