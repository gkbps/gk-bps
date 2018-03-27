import { FavComponent } from './fav.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FavComponent
  },
];

export const routing = RouterModule.forChild(routes);
