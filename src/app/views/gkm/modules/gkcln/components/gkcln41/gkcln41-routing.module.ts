// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln41Component } from './gkcln41.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln41Component,
    canActivate: [TcodeGuard],
    data: {
      title: 'solutionsAssignment'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln41RoutingModule {}
