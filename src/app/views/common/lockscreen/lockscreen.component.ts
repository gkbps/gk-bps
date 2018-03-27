import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../../app.config';
import { AuthenticationService } from '../../../nga/services/authentication.service';
import { BodyBackgroundService } from '../../../nga/services/bodyBackground.service';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { SecurityService } from '../../../nga/services/security.service';
import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { TcodeService } from '../../../nga/services/tcode.service';
import { ThemeService } from '../../../nga/services/theme.service';

/**
* @module LockscreenComponent
* Component for lockscreen page
*
* @function keyDownFunction
* @function returnSession
*/
@Component({
  templateUrl: 'lockscreen.component.html',
  styleUrls: ['./fixed.scss']
})
export class LockscreenComponent implements OnInit {
  loading = false;
  message: string;
  fullname;
  username;
  password;
  avatar;

  constructor(
    private router: Router,

    private translateService: TranslateService,

    private appConfig: AppConfig,
    private authenticationService: AuthenticationService,
    private bodyBackgroundService: BodyBackgroundService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private stateManagementService: StateManagementService,
    private tcodeService: TcodeService,
    private themeService: ThemeService,
  ) {
    // Initialize state
    themeService.changeLayout(localStorageService.getLayout());
    themeService.changeTheme(localStorageService.getTheme());

    // Initialize language
    translateService.use(localStorageService.getLang());
  }

  ngOnInit(): void {
    const savedSession = this.securityService.getSavedSession();
    this.fullname = savedSession.fullname;
    this.username = savedSession.username;

    const rootPath = this.appConfig.apiUrl;
    this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + savedSession.avatar;
  }

  /**
  * @function keyDownFunction
  * To check if user input equals enter
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.returnSession();
    }
  }

  /**
  * @function returnSession
  * Reinstate the session after user logged in
  */
  returnSession() {
    const token = this.securityService.getToken();
    if (this.password) {
      this.authenticationService.login(this.username, this.password, token)
        .subscribe(
          data => {
            if (this.navigationService.canReturn()) {
              this.navigationService.returnPrevious();
            } else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.log(error);
            this.message = 'incorrect_password';
            this.loading = false;

            setTimeout(() => {
              this.message = '';
            }, 3000);
          });
      }
    }
}
