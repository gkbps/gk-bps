import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// GK - Alphabet
import { AppConfig } from '../../app.config';
import { LocalStorageService } from './localStorage.service';
import { SecurityService } from './security.service';

/**
* @module AuthenticationService
* Service to authenticate user
*
* @function login
*/
@Injectable()
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,

    private appConfig: AppConfig,
    private localStorage: LocalStorageService,
    private securityService: SecurityService
  ) { }

  /**
  * @function login
  * Send user information to server for authentication and
  * Handle the response for system access
  *
  * @param {string} username
  * @param {string} password
  * @param {string} token
  *
  * @return {Promise}
  */
  login(username: string, password: string, token: string) {
    // return this.http.post(
    return this.httpClient.post(
        this.appConfig.apiUrl + '/users/authenticate',
        { username: username, password: password, token: token }
      )
      .map((response) => {
        // login successful if there's a jwt token in the response
        // console.log(response)
        const user = response;
        if (user && user['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.securityService.setMana(JSON.stringify(user['tcodes']));
          delete user['tcodes'];

          const env = this.localStorage.getEnv();
          env.wk.lge = user['defaultLge'];
          this.localStorage.setEnv(JSON.stringify(env));

          this.securityService.setCurrentUser(JSON.stringify(user));
          const savedSession = {
            avatar: user['avatar'],
            fullname: user['firstName'] + ' ' + user['lastName'],
            username: user['username'],
            setting: user['setting']
          };
          this.securityService.setSavedSession(JSON.stringify(savedSession));
        }
      }
    );
  }

}
