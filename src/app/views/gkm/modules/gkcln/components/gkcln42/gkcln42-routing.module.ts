// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln42Component } from './gkcln42.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln42Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'tcodesAssignment'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln42RoutingModule {}
