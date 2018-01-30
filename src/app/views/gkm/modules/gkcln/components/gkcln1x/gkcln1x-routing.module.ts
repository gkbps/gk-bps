// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln1xComponent } from './gkcln1x.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln1xComponent,
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
export class GkCln1xRoutingModule {}
