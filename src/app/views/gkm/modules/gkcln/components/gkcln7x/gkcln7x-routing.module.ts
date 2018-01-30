// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln7xComponent } from './gkcln7x.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln7xComponent,
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
export class GkCln7xRoutingModule {}
