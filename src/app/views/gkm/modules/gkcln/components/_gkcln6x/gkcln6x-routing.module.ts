// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln6xComponent } from './gkcln6x.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln6xComponent,
    canActivate: [TcodeGuard],
    data: {
      title: 'masterList'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln6xRoutingModule {}
