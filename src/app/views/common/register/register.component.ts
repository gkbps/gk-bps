import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { EmailValidator, EqualPasswordsValidator } from '../../../nga/validators';

import { UserService } from '../../../nga/common/user.service';

import { BodyBackgroundService } from '../../../nga/services';
import { LocalStorageService } from '../../../nga/services';
import { SecurityService } from '../../../nga/services';
import { StateManagementService } from '../../../nga/services';
import { TcodeService } from '../../../nga/services';

/**
* @module RegisterComponent
* Component for registration page
*/
@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['../login/fixed.scss']
})
export class RegisterComponent {

  public form: FormGroup;
  public firstname: AbstractControl;
  public lastname: AbstractControl;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public token: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  message: string;

  constructor(private router: Router,
    private userService: UserService,
    // private alertService: AlertService,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private bodyBackgroundService: BodyBackgroundService,
    private stateManagementService: StateManagementService,
    private tcodeService: TcodeService,
  ) {
    // Initialize state
    this.stateManagementService.initState('login-body');

    // Initialize language
    translate.use(localStorage.getLang());
    // get token
    this.model.token = this.securityService.getToken();

    this.form = fb.group(
      {
        'firstname': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        'lastname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'passwords': fb.group(
          {
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          },
          {
            validator: EqualPasswordsValidator.validate('password', 'repeatPassword'),
          },
        ),
        'token': [this.model.token, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.firstname = this.form.controls['firstname'];
    this.lastname = this.form.controls['lastname'];
    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.token = this.form.controls['token'];
  }

  /**
  * @function onSubmit
  * Check form dirty state
  */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(values);
      this.register();
    }
  }

  /**
  * @function register
  * Manage message for register form
  */
  register() {
    this.loading = true;
    // this.securityService.setToken(this.model.token);
    console.log(this.model);
    this.userService.create(this.model)
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
              console.log(error);
              switch (error.status) {
                case 400:
                  this.message = 'invalid_token';
                  break;
                case 404:
                  this.message = 'client_not_exist';
                  break;
                case 412:
                  this.message = 'user_email_exist';
                  break;
                case 500:
                  this.message = '500';
                  break;
                default:
                  this.message = 'fail_registration';
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
