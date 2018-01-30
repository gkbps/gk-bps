import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { TcodeService } from './tcode.service';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    private tcodeService: TcodeService,
  ) { }

  /*****************************************************************************
   * HISTORY
   * trackHistory:        To track the last (20) user visits to support backward
   * canReturn:           To confirm if return is possble
   * returnPrevious:      To perform backward
   *****************************************************************************/
  trackHistory(): void {
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', '[]');
    }

    const history: any[] = JSON.parse(localStorage.getItem('history'));

    while (history.length >= 10 ) {
      history.shift();
    }

    const currentUrl = this.router.url; /// this will give you current url
    if (currentUrl !== history[history.length - 1]) {
      history.push(currentUrl);
    }

    localStorage.setItem('history', JSON.stringify(history));
    // console.log(history);
  }

  canReturn(): boolean {
    const history: any[] = JSON.parse(localStorage.getItem('history'));
    return history ?  (history.length > 1) : false;
  }

  returnPrevious(): void {
    if (this.canReturn()) {
      const history: any[] = JSON.parse(localStorage.getItem('history'));
      history.pop();
      // console.log(history);
      const returnUrl: string = history[(history.length - 1)];
      history.pop();
      localStorage.setItem('history', JSON.stringify(history));
      // console.log(returnUrl);
      this.router.navigate([returnUrl]);
    } else {
      console.log('No history of user activity');
    }
  }

  gotoIntro() {
    this.router.navigate(['/intro']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  goto401() {
    this.router.navigate(['/#/401']);
  }

  goto403() {
    this.router.navigate(['/#/403']);
  }

  goto404() {
    this.router.navigate(['/#/404']);
  }

  goto500() {
    this.router.navigate(['/#/500']);
  }

}
