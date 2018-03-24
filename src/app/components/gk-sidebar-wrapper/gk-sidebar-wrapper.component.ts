import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// declare var jQuery: any;

// GK - Alphabet
import { GlobalState } from '../../global.state';

/**
* @module GkSidebarWrapperComponent
* Listen to 'sidebarMenu' event to update menu wrapper / menu items
* This facilitate implementation of menu based on context
*/
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
