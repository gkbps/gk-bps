// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln68Component } from './gkcln68.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln68Component,
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
export class GkCln68RoutingModule {}
