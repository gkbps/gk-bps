// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln89Component } from './gkcln89.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln89Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view_change'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln89RoutingModule {}
