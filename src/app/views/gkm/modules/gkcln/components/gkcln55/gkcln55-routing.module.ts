// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln55Component } from './gkcln55.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln55Component,
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
export class GkCln55RoutingModule {}
