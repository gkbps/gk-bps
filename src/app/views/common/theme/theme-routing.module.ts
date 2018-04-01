import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeComponent } from './theme.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    data: {
      title: 'theme'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
