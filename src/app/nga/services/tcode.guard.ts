import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// GK - Alphabet
import { SecurityService } from './security.service';
import { TcodeService } from './tcode.service';

/**
* @module TcodeGuard
* Guard to prevent openning route without corresponding tcode
*
* @function canActivate
*/
@Injectable()
export class TcodeGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) { }

  /**
  * @function canActivate
  * Check if entered tcode is included in user's Mana or not
  *
  * @return {boolean}
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('currentUser')) {

      // URL structure: /module/tcode -> ['','module','tcode']
      const urls = state.url.split('/');
      const tcode = urls[2];
      // console.log(urls);

      const check = this.tcodeService.checkTcodeInMana(tcode);
      // console.log(`User privilege to ${urls[2]} is: ${check}`);

      if (check) {
        return true;
      }
    }

    // tcode is not granted, redirect to 403
    this.router.navigate(['/403']);
    return false;
  }

}
