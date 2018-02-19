// External
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Internal
import { AuthGuard, TcodeGuard } from '../../../nga/services';

import { DraftComponent } from './draft.component';

const routes: Routes = [
  {
    path: '',
    component: DraftComponent,
    data: {
      title: 'draft'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftRoutingModule {}
