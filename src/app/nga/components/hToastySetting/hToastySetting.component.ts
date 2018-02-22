import { Component, OnInit, Input } from '@angular/core';

import {SelectItem} from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';

import { LocalStorageService } from '../../../nga/services';

@Component({
  selector: 'h-toasty-setting',
  templateUrl: './hToastySetting.html',
  styleUrls: ['hToastySetting.scss']
})
export class HToastySettingComponent implements OnInit {

  toastyPositionList: SelectItem[];
  toastyThemeList: SelectItem[];

  toastyPosition;
  toastyTheme;
  toastyTimeOut

  constructor(
    private globalState: GlobalState,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit () {
    this.toastyPosition = this.localStorageService.getToastyPosition() || 'bottom-right';
    this.toastyTheme = this.localStorageService.getToastyTheme() || 'default';
    this.toastyTimeOut = this.localStorageService.getToastyTimeOut() || 5000;

    this.initToastyTheme();
    this.initToastyPosition();
  }

  initToastyPosition() {
    this.toastyPositionList = [];
    this.toastyPositionList.push({label: 'Top Right', value: 'top-right'});
    this.toastyPositionList.push({label: 'Top Left', value: 'top-left'});
    this.toastyPositionList.push({label: 'Top Center', value: 'top-center'});
    this.toastyPositionList.push({label: 'Bottom Right', value: 'bottom-right'});
    this.toastyPositionList.push({label: 'Bottom Left', value: 'bottom-left'});
    this.toastyPositionList.push({label: 'Bottom Center', value: 'bottom-center'});
  }

  initToastyTheme() {
    this.toastyThemeList = [];
    this.toastyThemeList.push({label: 'Default', value: 'default'});
    this.toastyThemeList.push({label: 'Material', value: 'material'});
    this.toastyThemeList.push({label: 'Bootstrap', value: 'bootstrap'});
  }

  saveToasty() {
    console.log(this.toastyPosition, this.toastyTheme, this.toastyTimeOut);

    this.localStorageService.setToastyPosition(this.toastyPosition);
    this.localStorageService.setToastyTheme(this.toastyTheme);
    this.localStorageService.setToastyTimeOut(this.toastyTimeOut);

    const toastData = {
      type: 'success',
      title: 'SUCCESS',
      msg: 'Save successfully!',
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty','', toastData);
  }

  testToasty() {
    const toastType = ['default', 'info', 'success', 'wait', 'error', 'warning'];
    for (let i=0; i<toastType.length; i++) {
      setTimeout(()=> {
        const toastData = {
          type: toastType[i],
          title: toastType[i].toUpperCase(),
          msg: 'Testing, testing, testing...',
          showClose: true,
        };
        console.log(toastData);
        this.globalState.notifyMyDataChanged('toasty','', toastData);
      }, i*750);
    }
  }

}
