import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services';

@Component({
  selector: 'al-history',
  templateUrl: './alHistory.html',
  styleUrls: ['./alHistory.scss']
})
export class AlHistoryComponent implements OnInit {

  myScope = 'al-history';

  @Input() boxStyle = 'box-default';
  @Input() boxSolid = false;
  @Input() title = '';
  @Input() collapsable = false;
  @Input() removable = false;
  @Input() loading = false;

  constructor(
    private translate: TranslateService,

    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit () {
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
}
