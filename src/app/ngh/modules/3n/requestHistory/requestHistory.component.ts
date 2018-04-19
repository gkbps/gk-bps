import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { resetRequestHistoriesAction } from '../../../../ngrx/requestHistory/requestHistories.actions';
import { getRequestHistoriesAction } from '../../../../ngrx/requestHistory/requestHistories.actions';

import { AppConfig } from '../../../../app.config';
import { GlobalState } from '../../../../global.state';
import { HelperService } from '../../../../nga/services/helpers.service';
import { LocalStorageService } from '../../../../nga/services';
import { SecurityService } from '../../../../nga/services';

@Component({
  selector: 'request-history',
  templateUrl: './requestHistory.html',
  styleUrls: ['./requestHistory.scss']
})
export class RequestHistoryComponent implements OnInit {

  myScope = 'request-history';

  // Request id
  id = '';

  // Pagination
  first = 5;
  rows = 5;

  // Store for request document
  storeRequestHistories: any;
  requestHistories = [];

  colorsArray = [
    'bg-red',
    'bg-yellow',
    'bg-aqua',
    'bg-blue',
    'bg-light-blue',
    'bg-green',
    'bg-navy',
    'bg-teal',
    'bg-olive',
    'bg-lime',
    'bg-orange',
    'bg-fuchsia',
    'bg-purple',
    'bg-maroon',
    'bg-black',
    'bg-red-active',
    'bg-yellow-active',
    'bg-aqua-active',
    'bg-blue-active',
    'bg-light-blue-active',
    'bg-green-active',
    'bg-navy-active',
    'bg-teal-active',
    'bg-olive-active',
    'bg-lime-active',
    'bg-orange-active',
    'bg-fuchsia-active',
    'bg-purple-active',
    'bg-maroon-active',
    'bg-black-active',
  ];

  colorsList = {
    comment: 'bg-aqua',
    data: 'bg-blue',
    file: 'bg-red',
    mail: 'bg-yellow',
    person: 'bg-purple',
    status: 'bg-aqua',
    system: 'bg-aqua'
  }

  iconsList = {
    comment: 'ui-icon-comment',
    data: 'ui-icon-storage',
    file: 'ui-icon-insert-drive-file',
    mail: 'ui-icon-mail-outline',
    person: 'ui-icon-person-outline',
    status: 'ui-icon-person-outline',
    system: 'ui-icon-person-outline'
  }

  constructor(
    private activatedRoute: ActivatedRoute,

    private translate: TranslateService,

    private appConfig: AppConfig,
    private globalState: GlobalState,
    private helperService: HelperService,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,

    private store: Store<any>
  ) {
    // STORE
    this.storeRequestHistories = this.store.pipe(select('requestHistories'));
    this.storeRequestHistories.subscribe(data => {
      console.log(data);
      if (!data.pending && !data.error) {
        this.requestHistories = Object.assign([], data.data);

        this.requestHistories.forEach(item => {
          const rValue = this.helperService.extractDateTime(item.created_at);
          item['date'] = rValue['date'];
          item['time'] = rValue['time'];
        });

        console.log(this.requestHistories);
      }
    });
  }

  ngOnInit () {
    this.subscribeGlobalState();

    this.storeRequestHistories.dispatch(resetRequestHistoriesAction());

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
        this.storeRequestHistories.dispatch(getRequestHistoriesAction(this.id, 0, this.rows));
      }
    });

    const lang = this.localStorageService.getLang();
    this.translate.use(lang);
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  loadMore(event) {
    this.storeRequestHistories.dispatch(getRequestHistoriesAction(this.id, this.first, this.rows));
    this.first = this.first + this.rows;
    console.log('Load more comments');
  }

  extractDateTime(value) {
    const jsDate = new Date(value);

    const rDate = jsDate.getDate() + '/' + (jsDate.getMonth() + 1) + '/' + jsDate.getFullYear();
    const rTime = jsDate.getHours() + ':' + jsDate.getMinutes();

    return {
      date: rDate,
      time: rTime
    }
  }
}
