// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln78Component } from './gkcln78.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln78Component,
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
export class GkCln78RoutingModule {}
