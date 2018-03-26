import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
* @module AuthGuard
* Guard implements CanActivate and CanActivateChild
*
* @function canActivate
* @function canActivateChild
*/
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  /**
  * @function canActivate
  * Check and inform if route could be activated
  *
  * @param route
  * @param state
  *
  * @return {boolean}
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  /**
  * @function canActivateChild
  * Check and inform if child route could be activated
  *
  * @param route
  * @param state
  *
  * @return {boolean}
  */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
