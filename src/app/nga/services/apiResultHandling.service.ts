import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class APIResultHandlingService {

  constructor(
    private translate: TranslateService,
  ) { }

  /*
   * Function: processAPIResult
   * Purpose: To provide a single handler for all results received from API restful server
   * Design:
   * result = {status, url, _body {code, message, data ={anything}}
   */
  public processAPIResult(result) {
    console.log(result);

    return new Promise(
      (resolve, reject) => {
        let key1: string;
        let key2: string;

        key1 = result.status.toString();
        key2 = result.status.toString() + 'Msg';
        // const key3: string = JSON.parse(result._body).action + 'Action';

        this.translate.get([key1, key2, 'invalid_http_return'])
          .subscribe((res) => {

            let severity = '';
            let trackError = false;
            let summaryMsg = res[key1];
            let detailMsg = res[key2];

            switch (result.status) {
              case 200: // OK: GET, POST, PUT, PATCH, DELETE
              case 201: // CREATE: POST
                severity = 'info';
                break;

              case 206: // UPLOAD: POST
                severity = 'warn';
                trackError = true;
                break;

              case 304: // NOT MODIFIED: for Caching and for PATCH
                severity = 'warn';
                // Do not have result['_body']
                break;

              case 400: // BAD REQUEST: Invalid syntax
                severity = 'warn';
                trackError = true;
                break;

              case 401: // UNAUTHORIZED due to unauthenticated user
              case 403: // FORBIDDEN as authenticated user does not have proper right
                severity = 'error';
                trackError = true;
                break;

              case 404: // NOT FOUND
              case 412: // RE-CONDITION FAILED due to Validation
                severity = 'warn';
                trackError = true;
                break;

              case 500: // INTERNAL SERVER ERROR
                severity = 'error';
                trackError = true;
                break;

              default: // NOT SUPPORT STATUS: Invalid Http Return
                severity = 'error';
                trackError = true;
                summaryMsg = res['invalid_http_return'];
                detailMsg = res['invalid_http_return'];
                break;
            }

            // Tracking for debug via terminal
            if (trackError) {
              this.trackError({
                url: result.url,
                status: result.status,
                detail: result['_body'],
              });
            }

            // Return msg for Growl or Message`
            resolve({
              severity: severity,
              summary: summaryMsg,
              detail: detailMsg,
            });

          });
      }
    )
    .catch(error => {
      // Return msg for Growl or Message`
      return ({
        severity: 'error',
        summary: 'Undefied!',
        detail: 'Undefined error catched!',
      });
    });
  }


  trackError(error): void {
    // console.log(error);
    if (localStorage.getItem('errorHistory') === null) {
      localStorage.setItem('errorHistory', '[]');
    }
    const errorHistory: any[] = JSON.parse(localStorage.getItem('errorHistory'));
    while (errorHistory.length >= 10 ) {
      errorHistory.shift();
    }
    errorHistory.push(error);
    localStorage.setItem('errorHistory', JSON.stringify(errorHistory));
  }

}
