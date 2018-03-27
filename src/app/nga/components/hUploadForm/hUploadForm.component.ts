import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

import { Http, Response } from '@angular/http';
// import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/components/common/api';
// import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

// Internal
import { GlobalState } from '../../../global.state';
import { AppConfig } from '../../../app.config';
import {
  SecurityService,
  TcodeService,
  APIResultHandlingService,
  LocalStorageService,
  HttpClientService
} from '../../../nga/services';

@Component({
  selector: 'h-upload-form',
  templateUrl: './hUploadForm.html',
})
export class HUploadForm implements OnInit, OnDestroy {

  myScope = 'h-upload-form';

  @Input() tcode: string;
  @Input() module: string;

  @Input() defaultValue: String = '';
  @ViewChild('fileUpload') public _fileUpload: ElementRef;
  @ViewChild('inputText') public _inputText: ElementRef;

  action: String = '';
  actionUrl: String = '';
  url: string;

  msgs: Message[] = [];

  alertType: String;

  alertSubscription: Subscription;

  isUploadCompleted = false;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private el: ElementRef,
    private renderer: Renderer,
    private translate: TranslateService,

    private config: AppConfig,
    private globalState: GlobalState,

    // private router: Router,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private apiResultHandlingService: APIResultHandlingService,
    private httpClientService: HttpClientService,
    private localStorage: LocalStorageService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit () {
    this.isUploadCompleted = false;

    this.action = this.tcodeService.extractAction(this.tcode);
    switch (this.action) {
      case '21':
        this.actionUrl = '/upload/';
        break;

      case '23':
        this.actionUrl = '/upsert/';
        break;

      case '24':
        this.actionUrl = '/disableCollective/';
        break;

      case '25':
        this.actionUrl = '/enableCollective/';
        break;

      case '26':
        this.actionUrl = '/markCollective/';
        break;

      case '27':
        this.actionUrl = '/unmarkCollective/';
        break;

      case '28':
        this.actionUrl = '/deleteCollective/';
        break;

      default:
        break;
    }
    this.url = this.config.apiUrl + '/' + this.module + this.actionUrl;
    // console.log(this.url);
  }

  bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  fileChanged(event) {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      this._inputText.nativeElement.value = event.target.files[0].name;
    }
  }

  /* To get value and navigate the link */
  execute(): void {
    const files = this._fileUpload.nativeElement.files;
    // const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    // const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (files.length) {
    // if (fileCount > 0) {
       const file = files[0];
       formData.append('file', file);
       // formData.append('file', inputEl.files.item(0));

       // Deferral
       this.translate.get(['deferral', 'deferral_message'])
         .subscribe((res) => {
           const toastData = {
             type: 'wait',
             title: res['deferral'],
             msg: res['deferral_message'],
             showClose: true,
           };
           this.globalState.notifyMyDataChanged('toasty', '', toastData);
         });

       // TODO: Remove http
       // this.http.post(this.url, formData, this.securityService.jwt())
       this.httpClient.post(this.url, formData, this.httpClientService.attachHeader({}))
         // Do not map to have full response headers and _body
         // .map((res: Response) => res.json())
         .subscribe(
           (success) => {
             this.handleAPIReturn(success);
           },
           (error) => {
             this.handleAPIReturn(error);
           },
           () => { console.log('Subscription is completed'); },
         );
     }
  }

  handleAPIReturn(result) {
    this.apiResultHandlingService.processAPIResult(result)
      .then((msg) => {
        console.log(msg);

        this.isUploadCompleted = true;

        const toastData = {
          type: msg['type'],
          title: msg['title'],
          msg: msg['msg'],
          showClose: true,
        };

        this.globalState.notifyMyDataChanged('toasty', '', toastData);
      });
  }

  gotoTcode(tcode) {
    this.tcodeService.executeTcode(tcode, '');
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
