// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln20Component } from './gkcln20.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln20Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'collective'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln20RoutingModule {}
