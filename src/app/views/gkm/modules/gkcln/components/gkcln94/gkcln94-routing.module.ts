// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln94Component } from './gkcln94.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln94Component,
    canActivate: [TcodeGuard],
    data: {
      title: ''
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln94RoutingModule {}
