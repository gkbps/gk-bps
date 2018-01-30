// External
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Internal
import { SecurityService } from './security.service';
import { TcodeService } from './tcode.service';

@Injectable()
export class TcodeGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) { }

  /*
   * canActivate is used to check if user entered tcode is included in user's Mana
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('currentUser')) {

      // URL structure: /module/tcode -> ['','module','tcode']
      const urls = state.url.split('/');
      const tcode = urls[2];
      // console.log(urls);

      const check = this.tcodeService.checkTcodeInMana(tcode);
      console.log(`User privilege to ${urls[2]} is: ${check}`);

      if (check) {
        return true;
      }
    }

    // tcode is not granted, redirect to 403
    this.router.navigate(['/403']);
    return false;
  }

}
