import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// declare var jQuery: any;

// GK - Alphabet
import { GlobalState } from '../../global.state';

/**
* @module AppMenuComponent
* Listen to 'sidebarMenu' event to update menu wrapper / menu items
* This facilitate implementation of menu based on context
*/
@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html'
})
export class AppMenuComponent implements OnInit, OnDestroy {
  myScope = 'app-menu';
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
