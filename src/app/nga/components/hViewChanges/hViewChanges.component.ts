// External
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientService } from '../../services/'

import { Header } from 'primeng/shared';
import { Footer } from 'primeng/shared';
import { Message } from 'primeng/components/common/api';

// Internal
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
    private httpClientService: HttpClientService,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private apiResultHandlingService: APIResultHandlingService,
    private helpService: HelpService,
  ) {
    this.subscribeLocalState();
  }

  ngOnInit () {
    this.translateService.use(this.localStorageService.getLang());
    this.initViewChange();
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
    const pagination = {
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    const url = '/' + this.module + '/' + this.id + '/changes';

    this.httpClientService.get(url, reqOptions)
    .map((res) => {
      console.log(res);
      return res.body;
    })
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
        console.log(error);
      }
    );
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
