// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln27Component } from './gkcln27.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln27Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'massUnmark'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln27RoutingModule {}
