// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln62Component } from './gkcln62.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln62Component,
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
export class GkCln62RoutingModule {}
