// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln21Component } from './gkcln21.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln21Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'upload'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln21RoutingModule {}
