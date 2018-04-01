import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

/**
* @module AppMenuItemComponent
* Dedicated component for menu items that facilitate implementation of
* - menu items in tag <ul component inputs></ul> without break of style
* - menu recursive without limitation
*
* menu item is an object of:
* - data.icon
* - data.label
* - data.command
* - data.url
* - children
*
* Philosophy:
* Basically, menu allow
* 1. Open a list of children menu
* 2. Execute a callback
* 3. Goto an URL
*
* @param menu
* @param selectedMenu
*
* @function selectMenu
* @function executeCallback
* @function gotoURL
*
* @function changeLayout
* @function changeTheme
*/
@Component({
  selector: '[appMenuItem]',
  templateUrl: './app-menu-item.component.html'
})
export class AppMenuItemComponent {

  @Input() menu: any;
  selectedMenu: any;

  constructor(
    private router: Router,
  ) { }

  /**
  * @function selectMenu
  * First handler of menu once user click for command execution
  */
  selectMenu($event, item) {
    $event.preventDefault();
    this.selectedMenu = (this.selectedMenu === item ? null : item);
    event.stopPropagation(); // To prevent event escalate to upper menu level
    this.executeCallback(event, item);
    return false; // To prevent href work automatically
  }

  /**
  * @function executeCallback
  * Execute item with command function is a call back
  */
  executeCallback(event, item) {
    if (typeof item.data.command === 'function') {
      // console.log("Callback here");
      item.data.command(event);
    }
  }

  /**
  * @function gotoURL
  * If item.data.url exists, goto URL
  */
  gotoURL(url) {
    if (url) {
      this.router.navigate([url]);
    }
    return false;
  }

  // Zoombie functions
  changeLayout(layout) { }

  changeTheme(theme) { }
}
