import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import { AppConfig } from '../../../../app.config';
import { APIResultHandlingService } from '../../../../nga/services';
import { GlobalState } from '../../../../global.state';
import { HttpClientService } from '../../../../nga/services';
import { LocalStorageService } from '../../../../nga/services';

@Component({
  selector: 'h-history',
  templateUrl: './hHistory.html',
})
export class HHistory implements OnInit, OnDestroy {
  myScope = 'h-history';

  @Input() module: any;

  // Pagination
  first = 0;
  rows = 10;
  totalRecords = 100;
  data = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,

    private translateService: TranslateService,

    private appConfig: AppConfig,
    private apiResultHandlingService: APIResultHandlingService,
    private globalState: GlobalState,
    private httpClientService: HttpClientService,
    private localStorageService: LocalStorageService,
  ) {
    this.subscribeLocalState();
  }

  ngOnInit () {
    this.translateService.use(this.localStorageService.getLang());
    this.globalState.notifyMyDataChanged('help', '', 'tcd.19.viewChange');
    this.rows = this.localStorageService.getRows();
    this.updateData(this.first, this.rows); // Init History view
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* GLOBAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // COMPONENT OPERATION

  /**
  * event.first = Index of the first record
  * event.rows = Number of rows to display in new page
  * event.page = Index of the new page
  * event.pageCount = Total number of pages
  */
  paginate(event) {
    this.updateData(event.first, event.rows);
  }

  updateData(first, rows) {
    const pagination = {
      first: first,
      rows: rows
    };

    const url = this.appConfig.apiUrl + '/' + this.module + '/changes';

    this.httpClient.get(url, this.httpClientService.attachHeader({params: pagination}))
      .subscribe(
        (success) => {
          const result = success['body'];
          this.data = result.data;
          this.first = first;
          this.rows = rows;
          this.localStorageService.setRows(rows);
          this.totalRecords = result.total;
        },
        (error) => {
          this.handleAPIReturn(error);
        },
        () => { console.log('Subscription is completed'); }
      );
  }

  handleAPIReturn(result) {
    this.apiResultHandlingService.processAPIResult(result)
      .then((msg) => {
        // console.log(msg);

        const toastData = {
          type: msg['type'],
          title: msg['title'],
          msg: msg['msg'],
          showClose: true,
        };

        this.globalState.notifyMyDataChanged('toasty', '', toastData);
      });
  }

}
