import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../../app.config';
import { SecurityService } from '../../nga/services/security.service';

@Injectable()
export class UserService {

    prefix = '/users/';

    constructor(
      private http: Http,
      private config: AppConfig,
      private securityService: SecurityService,
    ) { }

    getAll() {
        return this.http.get(
            this.config.apiUrl + this.prefix,
            this.securityService.jwt(),
          )
        .map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(
            this.config.apiUrl + this.prefix + _id,
            this.securityService.jwt(),
          )
        .map((response: Response) => response.json());
    }

    create(user: any) {
        return this.http.post(
            this.config.apiUrl + this.prefix + 'register',
            user);
    }

    update(user: any) {
        return this.http.put(
            this.config.apiUrl + this.prefix + user._id,
            user,
            this.securityService.jwt(),
          );
    }

    delete(_id: string) {
        return this.http.delete(
            this.config.apiUrl + this.prefix + _id,
            this.securityService.jwt(),
          );
    }

    forgot(data: any) {
      return this.http.post(
        this.config.apiUrl + '/users/forgot',
        data
      );
    }
}
