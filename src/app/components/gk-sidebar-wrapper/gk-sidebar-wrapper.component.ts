import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// declare var jQuery: any;

import { GlobalState } from '../../global.state';

@Component({
  selector: 'gk-sidebar-wrapper',
  templateUrl: './gk-sidebar-wrapper.component.html'
})
export class GkSidebarWrapperComponent implements OnInit, OnDestroy {
  myScope = 'gk-sidebar-wrapper';

  menu: any;

  constructor(
    private globalState: GlobalState
  ) { }

  ngOnInit() {
    this.globalState.subscribeEvent('sidebarMenu', this.myScope, (menu) => {
      // console.log(menu);
      this.menu = menu;
    });
  }

  ngOnDestroy() {
    this.globalState.unsubscribeEvent('sidebarMenu', this.myScope);
  }

}
