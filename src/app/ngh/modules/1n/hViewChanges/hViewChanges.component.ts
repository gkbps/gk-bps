import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../global.state';

import { HttpClientService } from '../../../../nga/services/httpClient.service';
import { LocalStorageService } from '../../../../nga/services/localStorage.service';

@Component({
  selector: 'h-view-changes',
  templateUrl: './hViewChanges.html',
})
export class HViewChanges implements OnInit, OnDestroy {
  myScope = 'h-view-changes';

  @Input() module: any;

  id: string;

  // Pagination
  first = 0;
  rows = 5;
  totalRecords = 100;
  data = [];

  constructor(
    private activatedRoute: ActivatedRoute,

    private translateService: TranslateService,

    private globalState: GlobalState,
    private httpClientService: HttpClientService,
    private localStorageService: LocalStorageService,
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
    this.fetchData(0, this.rows);
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
  * @function paginate
  * Paginate the data
  *
  * @param event
  * event.first = Index of the first record
  * event.rows = Number of rows to display in new page
  * event.page = Index of the new page
  * event.pageCount = Total number of pages
  */
  paginate(event) {
    this.fetchData(event.first, event.rows);
  }

  /**
  * @function fetchData
  * Fetch paginated data from server
  *
  * @param first
  * @param rows
  */
  fetchData(first, rows) {
    const reqOptions = {
      params: {
        first: first,
        rows: rows
      }
    };

    const url = '/' + this.module + '/' + this.id + '/changes';

    this.httpClientService.get(url, reqOptions)
    .map((res) => {
      // console.log(res);
      return res.body;
    })
    .subscribe(
      result => {
        // console.log(result);
        this.data = result.data;
        this.first = first;
        this.rows = rows;
        this.totalRecords = result.total;
        // console.log('First:', this.first, 'Row:', this.rows, 'Total:', this.totalRecords);
      },
      error => {
        console.log(error);
      }
    );
  }

}
