import { AppConfig } from '../../app.config';
import { SecurityService } from './security.service';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SessionService {

    prefix = '/settings/';

    constructor(
      private http: Http,
      private config: AppConfig,
      private securityService: SecurityService,
    ) { }

    updateAwt() {
      return this.http.put(
          this.config.apiUrl + this.prefix,
          {},
          this.securityService.jwt(),
        );
    }

}
