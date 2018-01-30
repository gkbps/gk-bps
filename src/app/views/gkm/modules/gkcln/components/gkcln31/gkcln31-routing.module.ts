// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln31Component } from './gkcln31.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln31Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'new_client'
    },
  },
  {
    path: ':id',
    component: GkCln31Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'new_client'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln31RoutingModule {}
