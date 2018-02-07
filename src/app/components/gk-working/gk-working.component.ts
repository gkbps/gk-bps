import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../nga/services';

@Component({
  selector: 'gk-working',
  templateUrl: './gk-working.component.html',
  styleUrls: ['./fixed.scss'],
})
export class GkWorkingComponent implements OnInit, OnDestroy {
  myScope = 'gk-working';

  wkBarStatus = false;

  lges: SelectItem[];
  years: SelectItem[];

  selectedLge: any;
  selectedYear: any;

  constructor(
    private globalState: GlobalState,
    private localStorage: LocalStorageService,
  ) {
    this.subscribeGlobalState();
    this.wkBarStatus = this.localStorage.getWkBar();
  }

  ngOnInit() {
    this.selectedLge = this.localStorage.getWkLge();
    this.selectedYear = this.localStorage.getWkYear();

    const thisYear = new Date().getFullYear();

    this.lges = [];
    this.lges.push({label: 'Sanofi Aventis', value: '0475' });
    this.lges.push({label: 'Sanofi Synthelabor', value: '4247' });
    this.lges.push({label: 'Sanofi Vietnam', value: '1028' });

    this.years = [];
    this.years.push({label: 'Year ' + thisYear, value: thisYear.toString() });
    this.years.push({label: 'Year ' + (thisYear - 1), value: (thisYear - 1).toString() });
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('wkBarStatus', this.myScope, (wkBarStatus) => {
      // console.log(wkBarStatus);
      this.wkBarStatus = wkBarStatus;
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('wkBarStatus', this.myScope);
  }

  changeLge() {
    // console.log(this.selectedLge);
    this.localStorage.setWkLge(this.selectedLge);
  }

  changeYear() {
    // console.log(this.selectedYear);
    this.localStorage.setWkYear(this.selectedYear);
  }

}
