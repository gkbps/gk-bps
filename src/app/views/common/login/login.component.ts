import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../../../nga/services/authentication.service';
import { BodyBackgroundService } from '../../../nga/services/bodyBackground.service';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { SecurityService } from '../../../nga/services/security.service';
import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { TcodeService } from '../../../nga/services/tcode.service';
import { ThemeService } from '../../../nga/services/theme.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./fixed.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public token: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fb: FormBuilder,

    private authenticationService: AuthenticationService,
    private bodyBackgroundService: BodyBackgroundService,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private stateManagementService: StateManagementService,
    private tcodeService: TcodeService,
    private themeService: ThemeService
  ) {
    // Initialize state
    stateManagementService.initState('login-body');
    themeService.changeLayout(localStorageService.getLayout());
    themeService.changeTheme(localStorageService.getTheme());

    // Initialize language
    translate.use(localStorageService.getLang());

    // get token
    this.model.token = this.securityService.getToken();

    // reset login status
    this.securityService.logOut();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'token': [this.model.token, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.token = this.form.controls['token'];
  }

  /**
  * @function onSubmit
  * Check the dirty state of the form
  */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(values);
      this.login();
    }
  }

  /**
  * @function login
  * Manage message of login form
  */
  login() {
    this.loading = true;
    this.message = '';
    this.securityService.setToken(this.model.token);
    this.authenticationService.login(this.model.username, this.model.password, this.model.token)
      .subscribe(
        data => {
          // console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          switch (error.status) {
            case 400:
              this.message = 'invalid_token';
              break;

            case 401:
              this.message = 'incorrect_password';
              break;

            case 404:
              this.message = 'identity_not_exist';
              break;

            default:
              this.message = 'fail_login';
              break;
          }
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 3000);
        });
    }

    /**
    * @function gotoPage
    * Goto a page
    */
    gotoPage(page) {
      this.tcodeService.executeTcode(page);
    }

}
