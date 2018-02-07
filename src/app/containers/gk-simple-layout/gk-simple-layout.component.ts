import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/components/common/api';

import { GlobalState } from '../../global.state';
import {
  StateManagementService,
  BodyBackgroundService,
  LocalStorageService,
} from '../../nga/services';

@Component({
  selector: 'gk-simple-layout',
  templateUrl: './gk-simple-layout.component.html',
})
export class GkSimpleLayoutComponent implements OnInit, OnDestroy {

  myScope = 'gk-simple-layout';

  notificationMode: boolean;
  notificationType: boolean;

  msgs: Message[];
  timeOut = 5000;
  myInterval: any;

  constructor(
    private globalState: GlobalState,

    private stateManagementService: StateManagementService,
    private bodyBackgroundService: BodyBackgroundService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.timeOut = this.localStorageService.getTimeOut();
    this.subscribeLocalState();

    this.stateManagementService.initState();
    this.bodyBackgroundService.clearBodyBackground();

    // Reinstate user preference
    this.notificationMode = this.localStorageService.getNotificationMode();
    this.notificationType = this.localStorageService.getNotificationType();
    this.msgs = [];
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('notificationMessage', this.myScope, (notificationMessage) => {
      // console.log(notificationMessage);
      this.msgs = notificationMessage;
    });

    // ISSUE: If user close the growl mannually, then growl will not continue working
    this.myInterval = setInterval(()=> {
      // console.log('tick');
      if (this.msgs.length > 0) {
        this.msgs.splice(0, 1);
        // console.log(this.msgs);
      } else {
        // this.messageService.clear();
      }
    }, this.timeOut);
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('notificationMessage', this.myScope);
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }

}
