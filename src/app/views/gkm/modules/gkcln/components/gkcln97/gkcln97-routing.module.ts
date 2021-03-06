// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln97Component } from './gkcln97.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln97Component,
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
export class GkCln97RoutingModule {}
