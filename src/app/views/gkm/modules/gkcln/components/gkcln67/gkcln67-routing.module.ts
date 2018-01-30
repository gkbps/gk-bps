// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln67Component } from './gkcln67.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln67Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'unmark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln67RoutingModule {}
