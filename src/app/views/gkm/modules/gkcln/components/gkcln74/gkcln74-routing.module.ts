// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln74Component } from './gkcln74.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln74Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'enable'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln74RoutingModule {}
