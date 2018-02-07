import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
// import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';

import { AppConfig } from '../../../app.config';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  TcodeService,
  APIResultHandlingService,
} from '../../../nga/services';

// import * as FileSaver from 'file-saver';
// import * as StreamSaver from 'streamsaver';

import { BaseComponent } from '../../../views/base';

@Component({
  selector: 'h-download-form',
  templateUrl: './hDownloadForm.html',
})
export class HDownloadForm implements OnInit, OnDestroy {

  myScope = 'gk-download-form';

  @Input() tcode: string;
  @Input() module: string;

  @Input() defaultValue = '';
  @ViewChild('inputText') public _inputText: ElementRef;

  action = '';
  url: string;

  msgs: Message[] = [];

  alertType: string;

  langSubscription: Subscription;
  alertSubscription: Subscription;

  constructor(
    private http: Http,

    private config: AppConfig,
    public translateService: TranslateService,
    public globalState: GlobalState,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private apiResultHandlingService: APIResultHandlingService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.action = this.tcodeService.extractAction(this.tcode);
    this.url = this.config.apiUrl + '/' + this.module + '/download';
    // console.log(this.url);
  }


  /* To get value and navigate the link */
  execute(): void {
    console.log(this.url);
    console.log(this._inputText.nativeElement.value);

    const params = new URLSearchParams();
    params.append('filename', this._inputText.nativeElement.value);

    const reqOptions = new RequestOptions({
      headers: this.securityService.jwt().headers,
      search: params
    });
    console.log(reqOptions);

    this.http.get(this.url, reqOptions) // this.securityService.jwt()
      .subscribe(
        (response: Response) => {
          const rootPath = this.config.apiUrl;

          const url = rootPath + '/repo/download/' + JSON.parse(response['_body']).filename;
          console.log(url);
          window.open(url);
          /*
          console.log(response.headers);
          var mediaType = 'text/csv; charset=utf-8';
          var blob = new Blob([response['_body']], {type: mediaType});
          var filename = this._inputText.nativeElement.value +'.csv';
          FileSaver.saveAs(blob, filename);
          console.log('success');
          */
        },
        (error) => {
          // alert(error._body);
          // Or emit an event to tell user
          this.handleAPIReturn(error);
          console.log(error);
        },
        () => { console.log('Subscription is completed'); },
      );
  }

  handleAPIReturn(result) {
    this.apiResultHandlingService.processAPIResult(result)
      .then((msg) => {
        console.log(msg);
        this.msgs = [];
        this.msgs.push(msg);
        setTimeout(() => { this.msgs = []; }, 15000);
      });
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    // Register Language Callback in Global Status
    // this.globalState.subscribe('language', (lang)=>{
    //   console.log(lang);
    //   this.translateService.use(lang);
    // });

    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translateService.use(lang);
    });
  }

  unsubscribeGlobalState() {
    // this.globalState.unsubscribe('language');
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
