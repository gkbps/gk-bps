// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln65Component } from './gkcln65.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln65Component,
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
export class GkCln65RoutingModule {}
