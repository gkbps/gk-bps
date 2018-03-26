import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// GK- Alphabet
import { AppConfig } from '../../app.config';
import { HttpClientService } from './httpClient.service';
import { SecurityService } from './security.service';

/**
* @module SessionService
* Service to put Awt
*
* @function updateAwt
*/
@Injectable()
export class SessionService {

  prefix = '/settings/';

  constructor(
    private httpClient: HttpClient,
    private httpClientService: HttpClientService,

    // GK - Alphabet
    private config: AppConfig,
    private securityService: SecurityService,
  ) { }

  /**
  * @function updateAwt
  * Put Awt value
  * TODO ?
  */
  updateAwt() {
    return this.httpClient.put(
        this.config.apiUrl + this.prefix,
        {},
        this.httpClientService.attachHeader()
      );
  }

}
