// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../nga/services';

import { InboxComponent } from './inbox.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
    data: {
      title: 'inbox'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {}
