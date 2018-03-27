import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../global.state';
import { TcodeService } from './tcode.service';

/**
* @module NavigationService
* Service supports and enables navigation
*
* @function trackHistory
* @function canReturn
* @function returnPrevious
* @function gotoIntro
* @function gotoLogin
* @function goto401
* @function goto403
* @function goto404
* @function goto500
*/
@Injectable()
export class NavigationService {

  allowedHistory = 10;

  constructor(
    private router: Router,

    private translateService: TranslateService,

    // GK - Alphabet
    private globalState: GlobalState,
    private tcodeService: TcodeService,
  ) { }

  /**
  * @function trackHistory
  * Track history of user transversal into local storage, limited by allowedHistory
  */
  trackHistory(): void {
    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', '[]');
    }

    const history: any[] = JSON.parse(localStorage.getItem('history'));

    while (history.length >= this.allowedHistory ) {
      history.shift();
    }

    const currentUrl = this.router.url; /// this will give you current url
    if (currentUrl !== history[history.length - 1]) {
      history.push(currentUrl);
    }

    localStorage.setItem('history', JSON.stringify(history));
    // console.log(history);
  }

  /**
  * @function canReturn
  * Return a boolean value if user can traverse back perious page
  *
  * @return {boolean}
  */
  canReturn(): boolean {
    const history: any[] = JSON.parse(localStorage.getItem('history'));
    return history ?  (history.length > 1) : false;
  }

  /**
  * @function returnPrevious
  * Navigate to previous page if possible
  */
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
      this.translateService.get(['navigation', 'top_of_history'])
        .subscribe((res) => {
          const toastData = {
            type: 'info',
            title: res['navigation'],
            msg: res['top_of_history'],
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty', '', toastData);
        });
    }
  }

  /**
  * @function gotoIntro
  * Navigate to Intro page
  */
  gotoIntro() {
    this.router.navigate(['/intro']);
  }

  /**
  * @function gotoLogin
  * Navigate to Login page
  */
  gotoLogin() {
    this.router.navigate(['/login']);
  }

  /**
  * @function goto401
  * Navigate to 401 page
  */
  goto401() {
    this.router.navigate(['/#/401']);
  }

  /**
  * @function goto403
  * Navigate to 403 page
  */
  goto403() {
    this.router.navigate(['/#/403']);
  }

  /**
  * @function goto404
  * Navigate to 404 page
  */
  goto404() {
    this.router.navigate(['/#/404']);
  }

  /**
  * @function goto500
  * Navigate to 500 page
  */
  goto500() {
    this.router.navigate(['/#/500']);
  }

}
