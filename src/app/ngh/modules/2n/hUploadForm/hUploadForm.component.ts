import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../../../app.config';
import { APIResultHandlingService } from '../../../../nga/services';
import { GlobalState } from '../../../../global.state';
import { HttpClientService } from '../../../../nga/services';
import { TcodeService } from '../../../../nga/services';

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

  isUploadCompleted = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private httpClient: HttpClient,

    private translate: TranslateService,

    private appConfig: AppConfig,
    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
    private httpClientService: HttpClientService,
    private tcodeService: TcodeService
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
    this.url = this.appConfig.apiUrl + '/' + this.module + this.actionUrl;
    // console.log(this.url);
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

  // COMPONENT OPERATION

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
       const file = files[0];
       formData.append('file', file);

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

       this.httpClient.post(this.url, formData, this.httpClientService.attachHeader({}))
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
}
