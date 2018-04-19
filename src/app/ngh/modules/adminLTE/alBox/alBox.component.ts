import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services';

@Component({
  selector: 'al-box',
  templateUrl: './alBox.html',
  styleUrls: ['./alBox.scss']
})
export class AlBoxComponent implements OnInit {

  myScope = 'al-box';

  @Input() boxStyle = 'box-default';
  @Input() boxSolid = false;
  @Input() title = '';
  @Input() collapsable = false;
  @Input() collapsed = false;
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

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
