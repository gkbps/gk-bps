// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln87Component } from './gkcln87.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln87Component,
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
export class GkCln87RoutingModule {}
