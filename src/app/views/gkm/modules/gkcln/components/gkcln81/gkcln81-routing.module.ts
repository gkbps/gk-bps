// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln81Component } from './gkcln81.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln81Component,
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
export class GkCln81RoutingModule {}
