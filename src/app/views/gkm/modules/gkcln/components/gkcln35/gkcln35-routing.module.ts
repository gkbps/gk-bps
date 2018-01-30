// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln35Component } from './gkcln35.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln35Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'invoice'
    },
  },
  {
    path: ':id',
    component: GkCln35Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'invoice'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln35RoutingModule {}
