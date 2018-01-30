// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln53Component } from './gkcln53.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln53Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'edit'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln53RoutingModule {}
