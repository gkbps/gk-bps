import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

import { Store, select } from '@ngrx/store';
import { addNotificationAction } from '../../ngrx/notification/notifications.actions';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { AppConfig } from '../../app.config';
import { APIResultHandlingService } from './apiResultHandling.service';
import { GlobalState } from '../../global.state';
import { LoaderService } from './loader.service';
import { LocalStorageService } from '../../nga/services/localStorage.service';
import { ObjectService } from '../../nga/services/object.service';

/**
* @module HttpClientService
* Customized HttpClient functions to support HTTP REQUEST CYCLE MANAGEMENT
* 1. Pre-request activity: To show (Progress Bar) or (Deferral Message)
*    + (handleShowLoader): Conditional helper
*    + (showLoader): Show (Progress Bar) and/or (Deferral Message)
*
* 2. Send request by http verb (get, post, put, patch, delete)
*
* 3. Receive response and process
* - Catch if error then handle error via (onCatch)
* - Handle success response:
*   + (handleSuccess): Conditional helper (Update store or not)
*   + (onSuccess): Toast the response after processed
* - Handle error response: (onError)
*
* 4. Complete the cycle by some activity:
* - (onEnd): Conditional helper
* - (hideLoader): Hide (Progress Bar) or show (Deferral Complete Message)
*
* @function get
* @function post
* @function put
* @function patch
* @function delete
*
* @function handleShowLoader
* @function showLoader
*
* @function onCatch
*
* @function handleSuccess
* @function onSuccess
*
* @function onError
*
* @function onEnd
* @function hideLoader
*
* @function attachHeader
* @function getFullUrl
*/
@Injectable()
export class HttpClientService extends HttpClient {

  apiUrl = '';

  constructor(
    handler: HttpHandler,

    private store: Store<any>,

    private translateService: TranslateService,

    private appConfig: AppConfig,
    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private objectService: ObjectService,
  ) {
    super(handler);
    this.apiUrl = appConfig.apiUrl;
  }

  /**
  * @function get
  * Customize HttpClient get to handle get request cycle
  *
  * Receive below parameters
  * @param {string} url
  * @param {any|object} options
  * - {boolean} isDeferral decide if deferral message or not
  *
  * @return {Observable}
  */
  get(url: string, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.get(this.getFullUrl(url), this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
        // Hanle success response without notifying user
        // this.onSuccess(res, false);
          this.handleSuccess(res, false, options);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  /**
  * @function post
  * Customize HttpClient post to handle post request cycle
  *
  * Receive below parameters
  * @param {string} url
  * @param {any} body
  * @param {any|object} options
  * - {boolean} isDeferral decide if deferral message or not
  *
  * @return {Observable}
  */
  post(url: string, body: any | null, options?: any | {}): Observable<any> {
    // console.log(options);
    const reqOptions = this.handleShowLoader(options);

    return super.post(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          console.log(res);
          // Handle success including notifying user
          this.handleSuccess(res, true, options);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  /**
  * @function put
  * Customize HttpClient put to handle put request cycle
  *
  * Receive below parameters
  * @param {string} url
  * @param {any} body
  * @param {any|object} options
  * - {boolean} isDeferral decide if deferral message or not
  *
  * @return {Observable}
  */
  put(url: string, body: any | null, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.put(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          // Handle success including notifying user
          // this.onSuccess(res, true);
          this.handleSuccess(res, true, options);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  /**
  * @function patch
  * Customize HttpClient patch to handle patch request cycle
  *
  * Receive below parameters
  * @param {string} url
  * @param {any} body
  * @param {any|object} options
  * - {boolean} isDeferral decide if deferral message or not
  *
  * @return {Observable}
  */
  patch(url: string, body: any | null, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.patch(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          // Handle success including notifying user
          // this.onSuccess(res, true);
          this.handleSuccess(res, true, options);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  /**
  * @function delete
  * Customize HttpClient delete to handle delete request cycle
  *
  * Receive below parameters
  * @param {string} url
  * @param {any|object} options
  * - {boolean} isDeferral decide if deferral message or not
  *
  * @return {Observable}
  */
  delete(url: string, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.delete(this.getFullUrl(url), this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          // Handle success including notifying user
          // this.onSuccess(res, true);
          this.handleSuccess(res, true, options);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  /**
  * @function handleShowLoader
  * A conditional helper for
  * - showing (Progress Bar) or
  * - toasting (Deferral Message)
  * NOTE: Remove {isDeferral: true} after toasting (Deferral Message)
  * to keep options cleaned before sending request
  *
  * @param {object} options
  */
  private handleShowLoader(options) {
    const tmpOptions = Object.assign({}, options);
    // console.log(tmpOptions);

    if (!tmpOptions) {
      this.showLoader(false);
    } else if (this.objectService.hasProp(tmpOptions, 'isDeferral')) {
      this.showLoader(true);
      delete tmpOptions['isDeferral'];
    } else {
      this.showLoader(false);
    }

    return tmpOptions;
  }

  /**
  * @function showLoader
  * To show (Progress Bar) friendly or
  * to toast (Deferral Message)
  */
  private showLoader(isDeferral = false): void {
    if (!isDeferral) {
      this.loaderService.show();
    } else {
      this.translateService.get(['deferral', 'deferral_message'])
        .subscribe((res) => {
          const toastData = {
            type: 'wait',
            title: res['deferral'],
            msg: res['deferral_message'],
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty','', toastData);
        });
    }
  }

  /**
  * @function onCatch
  * To catch and throw error
  */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log('...is catching for error!');
    return Observable.throw(error);
  }

  /**
  * @function handleSuccess
  * A helper to handle Success response
  * - Inform user on success (alert: on/off)
  * - Update Notification if deferral tasks
  *
  * @param {http response} res
  * @param {boolean} alert - decide to inform user on success or not
  * @param {object} options - to store customized options, including isDeferral or not
  *
  * @return {null}
  */
  handleSuccess(res, alert, options) {
    const tmpOptions = Object.assign({}, options);
    // console.log(tmpOptions);

    this.onSuccess(res, alert);

    if (tmpOptions) {
      if (this.objectService.hasProp(tmpOptions, 'isDeferral')) {
        console.log('Update Store');
        console.log(res);
        this.store.dispatch(addNotificationAction(res.body.data));
      }
    }
  }

  /**
  * @function onSuccess
  * Inform user based on alert status and http response
  *
  * @param {http response} res
  * @param {boolean} alert - true: alert / false: silent
  */
  private onSuccess(res: Response, alert: boolean): void {
    if (alert) {
      this.apiResultHandlingService.processAPIResult(res)
      .then((msg) => {
        console.log(msg);
        const toastData = {
          type: msg['type'],
          title: msg['title'],
          msg: msg['msg'],
          showClose: true,
        };
        this.globalState.notifyMyDataChanged('toasty','', toastData);
      });
    }
  }

  /**
  * @function onError
  * Inform user on error
  *
  * @param {http response} error
  */
  private onError(error): void {
    console.log(error);
    this.apiResultHandlingService.processAPIResult(error)
    .then((msg) => {
      // console.log(msg);
      const toastData = {
        type: msg['type'],
        title: msg['title'],
        msg: msg['msg'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty','', toastData);
    });
  }

  /**
  * @function onEnd
  * Complete the cycle to handle http request
  *
  * @param {object} options
  */
  private onEnd(options): void {
    const tmpOptions = Object.assign({}, options);
    // console.log(tmpOptions);

    if (!tmpOptions) {
      this.hideLoader(false);
    } else if (this.objectService.hasProp(tmpOptions, 'isDeferral')) {
      this.hideLoader(true);
    } else {
      this.hideLoader(false);
    }
  }

  /**
  * @function hideLoader
  * To hide (Progress Bar) after data loading finished
  * To toast the (Deferral Complete Message) after deferral task completed
  */
  private hideLoader(isDeferral = false): void {
    if (!isDeferral) {
      this.loaderService.hide();
    } else {
      this.translateService.get(['deferral_completed', 'deferral_completed_message'])
        .subscribe((res) => {
          const toastData = {
            type: 'info',
            title: res['deferral_completed'],
            msg: res['deferral_completed_message'],
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty','', toastData);
        });
    }
  }

  /**
  * @function attachHeader
  * Utility to generate standard header with JWT and
  * attach other options into request before it is sent
  *
  * Below is the options format of HttpClient
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: HttpObserve;
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  */
  public attachHeader(options?: any | null): any {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const awt: string = JSON.stringify(currentUser.awt); // Array Web Token
    const token: string = localStorage.getItem('token');

    if (options == null) { options = {}; }

    if (currentUser && currentUser.token) {
      options.headers = new HttpHeaders({
        'authorization': 'Bearer ' + currentUser.token,
        'awt': awt,
        'usr': currentUser._id,
        'token': token
      });
      options.observe = 'response'; // IMPORTANT: To return the full response info with status
    }
    // console.log(options);
    return options;
  }

  /**
  * @function getFullUrl
  * To generate full url to server
  *
  * @param {string} prefix
  * @return {string}
  */
  private getFullUrl(prefix: string): string {
    console.log(this.apiUrl + prefix);
    return this.apiUrl + prefix;
  }
}
