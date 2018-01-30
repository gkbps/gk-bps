import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../../app.config';
import {
  BodyBackgroundService,
  LocalStorageService,
  TcodeService,
  StateManagementService,
  AuthenticationService,
  SecurityService,
  ThemeService,
  NavigationService,
} from '../../../nga/services';

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
    private bodyBackgroundService: BodyBackgroundService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private tcodeService: TcodeService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private stateManagementService: StateManagementService,
    private themeService: ThemeService,
    private securityService: SecurityService,
    private config: AppConfig,
    private navigationService: NavigationService,
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

    const rootPath = this.config.apiUrl;
    this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + savedSession.avatar;
  }

  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.returnSession();
    }
  }

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
              this.message = ''
            }, 3000);
          });
      }
    }
}
