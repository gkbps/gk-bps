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

import { AppConfig } from '../../app.config';
import { LoaderService } from './loader.service';
import { APIResultHandlingService } from './apiResultHandling.service';
import { Message } from 'primeng/components/common/api';
import { GlobalState } from '../../global.state';

@Injectable()
export class HttpClientService extends HttpClient {

  apiUrl = '';
  msgs: Message[] = [];

  constructor(
    handler: HttpHandler,

    private appConfig: AppConfig,
    private loaderService: LoaderService,
    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
  ) {
    super(handler);
    this.apiUrl = appConfig.apiUrl;
  }

  get(url: string, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.get(this.getFullUrl(url), this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res, false);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      }
    );

  }

  post(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.post(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
      }
    );
  }

  postManualResultHandler(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.post(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          return res;
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
      }
    );
  }

  put(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.put(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
      }
    );
  }

  putManualResultHandler(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.put(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          return res;
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
      }
    );
  }

  patch(url: string, body: any | null, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.patch(this.getFullUrl(url), body, this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
      }
    );
  }

  delete(url: string, options?: any | {}): Observable<any> {
    this.showLoader();
    return super.delete(this.getFullUrl(url), this.attachHeader(options))
      .catch(this.onCatch)
      .do((res: Response) => {
          this.onSuccess(res, true);
        }, (error: any) => {
          this.onError(error);
        })
      .finally(() => {
        this.onEnd();
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
    return this.apiUrl + prefix;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log('...is catching for error!');
    return Observable.throw(error);
  }

  private onSuccess(res: Response, alert: boolean): void {
    // console.log('request successful');
    console.log(res);
    if (alert) {
      this.apiResultHandlingService.processAPIResult(res)
      .then((msg) => {
        console.log(msg);
        this.msgs = [];
        this.msgs.push(msg);
        this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      });
    }
  }

  private onError(error): void {
    console.log(error);
    this.apiResultHandlingService.processAPIResult(error)
    .then((msg) => {
      console.log(msg);
      this.msgs = [];
      this.msgs.push(msg);
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    });
  }

  private onEnd(): void {
    this.hideLoader();
    // console.log('end');
  }

  private showLoader(): void {
    this.loaderService.show();
    // console.log('showloader');
  }

  private hideLoader(): void {
    this.loaderService.hide();
    // console.log('hideloader');
  }

}
