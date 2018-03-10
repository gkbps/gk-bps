// TODO: To handle apiResultHandling in this services
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import {
  addNotificationAction,
} from '../../ngrx/notification/notifications.actions';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../app.config';
import { LoaderService } from './loader.service';
import { APIResultHandlingService } from './apiResultHandling.service';

import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../nga/services/localStorage.service';
import { ObjectService } from '../../nga/services/object.service';

@Injectable()
export class HttpClientService extends HttpClient {

  apiUrl = '';

  constructor(
    handler: HttpHandler,

    private appConfig: AppConfig,
    private loaderService: LoaderService,
    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private objectService: ObjectService,
    private store: Store<any>
  ) {
    super(handler);
    this.apiUrl = appConfig.apiUrl;
  }

  get(url: string, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.get(this.getFullUrl(url), this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res, false);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  post(url: string, body: any | null, options?: any | {}): Observable<any> {
    // console.log(options);

    const reqOptions = this.handleShowLoader(options);

    return super.post(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
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

  postCustomized(url: string, body: any | null, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.post(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          return res;
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  put(url: string, body: any | null, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.put(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  putCustomized(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.put(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          return res;
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  patch(url: string, body: any | null, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.patch(this.getFullUrl(url), body, this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }

  delete(url: string, options?: any | {}): Observable<any> {
    const reqOptions = this.handleShowLoader(options);

    return super.delete(this.getFullUrl(url), this.attachHeader(reqOptions))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd(options);
      }
    );
  }


  /**
   * FUNCTION TO ATTACH AUTHENTICATED HEADER FOR OPTIONS
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
  private attachHeader(options?: any | null): any {
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

  private getFullUrl(prefix: string): string {
    console.log(this.apiUrl + prefix);
    return this.apiUrl + prefix;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log('...is catching for error!');
    return Observable.throw(error);
  }

  handleSuccess(res, alert, options) {
    const tmpOptions = Object.assign({}, options);

    this.onSuccess(res, alert);

    // console.log(tmpOptions);
    if (tmpOptions) {
      if (this.objectService.hasProp(tmpOptions, 'isDeferral')) {
        console.log('Update Store');
        this.store.dispatch(addNotificationAction(res.body.data));
      }
    }
  }

  private onSuccess(res: Response, alert: boolean): void {
    // console.log('request successful');
    // console.log(res);

    // this.store.dispatch(addNotificationAction(res));

    if (alert) {
      this.apiResultHandlingService.processAPIResult(res)
      .then((msg) => {
        console.log(msg);
        // const toastData = {
        //   type: 'warning',
        //   title: res.navigation,
        //   msg: res.top_of_history,
        //   showClose: true,
        // };
        // this.globalState.notifyMyDataChanged('toasty','', toastData);
      });
    }
  }

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

  private onEnd(options): void {
    const tmpOptions = Object.assign({}, options);

    console.log(tmpOptions);
    if (!tmpOptions) {
      this.hideLoader(false);
    } else if (this.objectService.hasProp(tmpOptions, 'isDeferral')) {
      this.hideLoader(true);
    } else {
      this.hideLoader(false);
    }
    // console.log('end');
  }

  private handleShowLoader(options) {
    const tmpOptions = Object.assign({}, options);

    console.log(tmpOptions);
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
    // console.log('showloader');
  }

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
    // console.log('hideloader');
  }

}
