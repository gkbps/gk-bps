// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln13Component } from './gkcln13.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln13Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'edit'
    },
  },
  {
    path: ':id',
    component: GkCln13Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'edit'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln13RoutingModule {}
