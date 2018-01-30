import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  constructor(
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // console.log(val);
      }
    });
  }

  ngOnDestroy() {
  }

}
