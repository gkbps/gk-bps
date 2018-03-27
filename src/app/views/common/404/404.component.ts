import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { TcodeService } from '../../../nga/services/tcode.service';
import { ThemeService } from '../../../nga/services/theme.service';

/**
* @module P404Component
* Page 404
*
* @function keyDownFunction
* @function executeTcode
*/

@Component({
  templateUrl: '404.component.html',
  styleUrls: ['../401/fixed.scss']
})
export class P404Component {
  public tcodeExecution = '';

  constructor(
    private router: Router,
    private translateService: TranslateService,

    private stateManagementService: StateManagementService,
    private localStorageService: LocalStorageService,
    private themeService: ThemeService,
    private tcodeService: TcodeService,
  ) {
    // Initialize state
    this.stateManagementService.initState('exception-body notfound');

    // Initialize language
    translateService.use(localStorageService.getLang());
  }

  /**
  * @function keyDownFunction
  * Check if user input equals enter
  *
  * @param event
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.executeTcode();
    }
  }

  /**
  * @function executeTcode
  * Execute a Tcode
  */
  public executeTcode() {
    const url: string = this.tcodeService.urlLead(this.tcodeExecution);
    // console.log(url);
    this.tcodeExecution = '';
    this.router.navigate([url]);
  }

}
