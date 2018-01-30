// import { AuthGuard, AuthTCodeGuard } from '../../../nga/services';

import { Fav } from './fav.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Fav    
  },
];

export const routing = RouterModule.forChild(routes);
