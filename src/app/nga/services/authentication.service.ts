import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { LocalStorageService } from './localStorage.service';
import { SecurityService } from './security.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http,
    private config: AppConfig,
    private localStorage: LocalStorageService,
    private securityService: SecurityService
  ) { }

  login(username: string, password: string, token: string) {
    return this.http.post(
        this.config.apiUrl + '/users/authenticate',
        { username: username, password: password, token: token }
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.securityService.setMana(JSON.stringify(user.tcodes));
          delete user.tcodes;

          let env = this.localStorage.getEnv();
          env.wk.lge = user.defaultLge;
          this.localStorage.setEnv(JSON.stringify(env));

          this.securityService.setCurrentUser(JSON.stringify(user));
          const savedSession = {
            avatar: user.avatar,
            fullname: user.firstName + ' ' + user.lastName,
            username: user.username
          };
          this.securityService.setSavedSession(JSON.stringify(savedSession));
        }
      }
    );
  }

}
