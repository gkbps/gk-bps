// External
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { Message } from 'primeng/components/common/api';

// Internal
import { AppConfig } from '../../../app.config';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  LocalStorageService,
  NavigationService,
  APIResultHandlingService,
  HelpService
} from '../../../nga/services';

@Component({
  selector: 'h-view-changes',
  templateUrl: './hViewChanges.html',
})
export class HViewChanges implements OnInit, OnDestroy {
  myScope = 'h-view-changes';

  @Input() module: any;

  id: string;
  msgs: Message[] = [];

  first = 0;
  rows = 5;
  totalRecords = 100;
  data = [];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private http: Http,
    private config: AppConfig,
    private securityService: SecurityService,
    private apiResultHandlingService: APIResultHandlingService,
    private helpService: HelpService
  ) {
    this.subscribeLocalState();
  }

  ngOnInit () {
    this.translateService.use(this.localStorageService.getLang());
    this.initViewChange();
    // this.globalState.notifyDataChanged('help', 'tcd.19.viewChange');
    this.globalState.notifyMyDataChanged('help', '', 'tcd.19.viewChange');
  }

  private initViewChange() {
    // To early interact with API restful server
    this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
        }
      });
    this.updateData(0, this.rows);
  }

  paginate(event) {
    // event.first = Index of the first record
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages

    this.updateData(event.first, event.rows);
  }

  updateData(first, rows) {
    this.viewChangeById(first, rows)
    .subscribe(
      result => {
        console.log(result);
        this.data = result.data;
        this.first = first;
        this.rows = rows;
        this.totalRecords = result.total;
        console.log('First:', this.first, 'Row:', this.rows, 'Total:', this.totalRecords);
      },
      error => {
        this.handleAPIReturn(error);
      }
    );

  }

  viewChangeById(first: number, rows: number) {
      const pagination = {
        first: first,
        rows: rows
      };

      const reqOptions = this.securityService.jwt().merge({params: pagination});
      // console.log(reqOptions);

      const url = this.config.apiUrl + '/' + this.module + '/viewChange/' + this.id;
      // console.log(url);

      return this.http.get(url, reqOptions)
      .map((response: Response) => response.json());
  }

  handleAPIReturn(result) {
    this.apiResultHandlingService.processAPIResult(result)
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

}
