// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../../../../nga/services';

import { GkCln3xComponent } from './gkcln3x.component';

const routes: Routes = [
  {
    path: '',
    component: GkCln3xComponent,
    data: {
      title: 'request'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkCln3xRoutingModule {}
