// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln52Component } from './gkcln52.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln52Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'view'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln52RoutingModule {}
