// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln93Component } from './gkcln93.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln93Component,
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
export class GkCln93RoutingModule {}
