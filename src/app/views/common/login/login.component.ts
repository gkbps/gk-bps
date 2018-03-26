import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import {
  AuthenticationService,
  SecurityService,
  LocalStorageService,
  BodyBackgroundService,
  ThemeService,
  TcodeService,
  StateManagementService,
} from '../../../nga/services';

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
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private bodyBackgroundService: BodyBackgroundService,
    private themeService: ThemeService,
    private stateManagementService: StateManagementService,
    private tcodeService: TcodeService,
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

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(values);
      this.login();
    }
  }

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
            this.message = ''
          }, 3000);
        });
    }

    gotoPage(page) {
      this.tcodeService.executeTcode(page);
    }

}
