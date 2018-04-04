import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { TranslateService } from '@ngx-translate/core';

import { APIResultHandlingService } from '../../../../nga/services';
import { GlobalState } from '../../../../global.state';
import { HttpClientService } from '../../../../nga/services/httpClient.service';
import { SecurityService } from '../../../../nga/services';
import { TcodeService } from '../../../../nga/services';

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

  isSubmited = false;

  langSubscription: Subscription;

  constructor(
    private http: Http,

    public translateService: TranslateService,

    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() {
    this.action = this.tcodeService.extractAction(this.tcode);
    this.url = '/' + this.module + '/download';
    // console.log(this.url);

    this.isSubmited = false;
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // FORM OPERATION

  /* To get value and navigate the link */
  execute(): void {
    const reqOptions = {
      params: {
        filename: this._inputText.nativeElement.value
      },
      isDeferral: true
    };

    this.httpClientService.post(this.url, {tcode: 'dl'}, reqOptions)
      .subscribe(
        (response) => {
          console.log(response);
          // window.open(url);
        }
      );

    this.isSubmited = true;
  }

  gotoTcode(tcode) {
    this.tcodeService.executeTcode(tcode);
  }
}
