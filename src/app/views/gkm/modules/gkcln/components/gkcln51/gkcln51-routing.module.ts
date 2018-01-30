// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln51Component } from './gkcln51.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln51Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'create'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln51RoutingModule {}
