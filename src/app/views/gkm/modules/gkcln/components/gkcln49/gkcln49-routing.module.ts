// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln49Component } from './gkcln49.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln49Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'processes'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln49RoutingModule {}
