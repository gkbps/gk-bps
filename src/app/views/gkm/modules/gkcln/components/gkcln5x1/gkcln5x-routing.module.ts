// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln5xComponent } from './gkcln5x.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln5xComponent,
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
export class GkCln5xRoutingModule {}
