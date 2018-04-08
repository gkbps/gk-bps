import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
* @module APIResultHandlingService
* Service process the response reveived from server.
*
* @function processAPIResult
* @function trackError
*/
@Injectable()
export class APIResultHandlingService {

  constructor(
    private translate: TranslateService,
  ) { }

  /**
  * @function processAPIResult
  * A handler for all response received from server
  *
  * @param result (response) = {
  * - status,
  * - url,
  * - _body {
  *   + code,
  *   + message,
  *   + data = {anything}
  * }
  * @return {Promise}
  */
  public processAPIResult(result) {
    // console.log(result);

    return new Promise(
      (resolve, reject) => {
        let key1: string;
        let key2: string;

        key1 = result.status.toString();
        key2 = result.status.toString() + 'Msg';

        this.translate.get([key1, key2, 'invalid_http_return'])
          .subscribe((res) => {

            let type        = '';
            let trackError  = false;
            let title       = res[key1];
            let msg         = res[key2];

            switch (result.status) {
              case 200: // OK: GET, POST, PUT, PATCH, DELETE
              case 201: // CREATE: POST
                type = 'info';
                break;

              case 206: // UPLOAD: POST
                type = 'warning';
                trackError = true;
                break;

              case 304: // NOT MODIFIED: for Caching and for PATCH
                type = 'warn';
                // Do not have result['_body']
                break;

              case 400: // BAD REQUEST: Invalid syntax
                type = 'warning';
                trackError = true;
                break;

              case 401: // UNAUTHORIZED due to unauthenticated user
              case 403: // FORBIDDEN as authenticated user does not have proper right
                type = 'error';
                trackError = true;
                break;

              case 404: // NOT FOUND
              case 412: // RE-CONDITION FAILED due to Validation
                type = 'warning';
                trackError = true;
                break;

              case 500: // INTERNAL SERVER ERROR
                type = 'error';
                trackError = true;
                break;

              default: // NOT SUPPORT STATUS: Invalid Http Return
                type = 'error';
                trackError = true;
                title = res['invalid_http_return'];
                msg = res['invalid_http_return'];
                break;
            }

            // Tracking for debug via terminal
            if (trackError) {
              this.trackError({
                url: result.url,
                status: result.status,
                detail: result['error'],
              });
            }

            // Return promise
            resolve({
              type: type,
              title: title,
              msg: msg,
            });

          });
      }
    )
    .catch(error => {
      this.translate.get(['undefined_error', 'undefined_error_msg'])
        .subscribe((res) => {
          return ({
            type: 'error',
            title: res.undefined_error,
            msg: res.undefined_error_msg,
          });
        });
    });
  }

  /**
  * @function trackError
  * Function to capture response with error status into local storage for later debug
  * Max record = 20
  *
  * @param error
  */
  trackError(error): void {
    // console.log(error);
    if (localStorage.getItem('errorHistory') === null) {
      localStorage.setItem('errorHistory', '[]');
    }
    const errorHistory: any[] = JSON.parse(localStorage.getItem('errorHistory'));
    while (errorHistory.length >= 20 ) {
      errorHistory.shift();
    }
    errorHistory.push(error);
    localStorage.setItem('errorHistory', JSON.stringify(errorHistory));
  }

}
