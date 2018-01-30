import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import {
  StateManagementService,
  LocalStorageService,
  ThemeService,
  TcodeService,
} from '../../../nga/services';

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

  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.executeTcode();
    }
  }

  public executeTcode() {
    const url: string = this.tcodeService.urlLead(this.tcodeExecution);
    // console.log(url);
    this.tcodeExecution = '';
    this.router.navigate([url]);
  }

}
