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
  templateUrl: '401.component.html',
  styleUrls: ['./fixed.scss']
})
export class P401Component {
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
    this.stateManagementService.initState('exception-body accessdenied');
    const env = localStorageService.getEnv();

    this.themeService.changeLayout(env.pref.layout) ;
    this.themeService.changeTheme(env.pref.theme) ;

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
