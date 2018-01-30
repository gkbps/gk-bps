import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[gkSidebarMenu]',
  templateUrl: './gk-sidebar-menu.component.html'
})
export class GkSidebarMenuComponent {

  @Input() menu: any;

  selectedMenu: any;

  constructor(
    private router: Router,
  ) {
  }

  selectMenu($event, item) {
    $event.preventDefault();
    this.selectedMenu = (this.selectedMenu === item ? null : item);
    event.stopPropagation(); // To prevent event escalate to upper menu level
    this.executeCallback(event, item);
    return false; // To prevent href work automatically
  }

  // To execute item with command function is a call back rather than an URL
  executeCallback(event, item) {
    if (typeof item.data.command === 'function') {
      // console.log("Callback here");
      item.data.command(event);
    }
  }

  // Zoombie functions
  changeLayout(layout) { }

  changeTheme(theme) { }

  gotoURL(url) {
    // console.log(url);
    if (url) {
      this.router.navigate([url]);
    }
    return false;
  }
  
}
