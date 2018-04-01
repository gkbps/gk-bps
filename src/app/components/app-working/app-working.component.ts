import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';

// GK - Alphabet
import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../nga/services/localStorage.service';

/**
* @module AppWorkingComponent
* Status bar for current working indicators (year, lge). Listen to change and update local storage
*
* Philosophy
* System is divided into year and allow multi legal entity in 1 database
* Therefore, any action must be known to affect what year and legal entity
* This allow quick switch beside another tcode to change wkYear and wkLegalEntity
*
* @param myScope
* @param {boolean} wkBarStatus
* @param {array} lges
* @param {array} years
* @param {any} selectedLge
* @param {any} selectedYear
*
* @function changeLge
* @function changeYear
*/
@Component({
  selector: 'app-working',
  templateUrl: './app-working.component.html',
  styleUrls: ['./fixed.scss'],
})
export class AppWorkingComponent implements OnInit, OnDestroy {
  myScope = 'app-working';

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

    // TODO: To check if year N-1 exist for such client or not based on the day of service start
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
      this.wkBarStatus = wkBarStatus;
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('wkBarStatus', this.myScope);
  }

  /* LOCAL OPERATION */

  /**
  * @function changeLge
  * Update change of selected working legal entity into local storage
  */
  changeLge() {
    this.localStorage.setWkLge(this.selectedLge);
  }

  /**
  * @function changeYear
  * Update change of selected working year into local storage
  */
  changeYear() {
    this.localStorage.setWkYear(this.selectedYear);
  }

}
