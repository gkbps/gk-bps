// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln16Component } from './gkcln16.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln16Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'mark'
    },
  },
  {
    path: ':id',
    component: GkCln16Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'mark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln16RoutingModule {}
