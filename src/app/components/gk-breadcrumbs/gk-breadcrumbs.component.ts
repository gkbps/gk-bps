import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { Message } from 'primeng/components/common/api';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import {
  NavigationService ,
  HelpService
} from '../../nga/services';

@Component({
  selector: 'gk-breadcrumbs',
  templateUrl: './gk-breadcrumbs.component.html'
})
export class GkBreadcrumbsComponent implements OnInit, OnDestroy {
  myScope = 'gk-breadcrumbs';

  helpFile: String = 'intro';
  helpContext: String;

  breadcrumbs: Array<Object>;

  msgs: Message[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private translateService: TranslateService,
    private globalState: GlobalState,
    private navigationService: NavigationService,
    private helpService: HelpService,
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
      url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        // tslint:disable-next-line:no-shadowed-variable
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            this.breadcrumbs.push({
              label: route.snapshot.data,
              url:   url
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

  ngOnInit() {
    this.globalState.subscribeEvent('help', this.myScope, (helpFile) => {
      this.helpFile = helpFile;
      this.helpService.getHelpFromHTMLFile(helpFile)
        .subscribe((helpContext) => {
          this.helpContext = helpContext;
          // console.log(helpContext);
        });
    });

    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.helpService.getHelpFromHTMLFile(this.helpFile)
        .subscribe((helpContext) => {
          this.helpContext = helpContext;
          // console.log(helpContext);
        });
    });

  }

  returnPrevious() {
    if (this.navigationService.canReturn()) {
      this.navigationService.returnPrevious();
    } else {
      this.translateService.get([
        'navigation', 'top_of_history'
      ])
        .subscribe((res) => {
          const toastData = {
            type: 'warning',
            title: res.navigation,
            msg: res.top_of_history,
            showClose: true,
          };
          this.globalState.notifyMyDataChanged('toasty','', toastData);
        });
    }
    return false;
  }

  ngOnDestroy() {
    this.globalState.unsubscribeEvent('help', this.myScope);
    this.globalState.unsubscribeEvent('language', this.myScope);
  }
}
