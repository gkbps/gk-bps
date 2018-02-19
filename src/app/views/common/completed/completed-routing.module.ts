// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../nga/services';

import { CompletedComponent } from './completed.component';

const routes: Routes = [
  {
    path: '',
    component: CompletedComponent,
    data: {
      title: 'draft'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedRoutingModule {}
