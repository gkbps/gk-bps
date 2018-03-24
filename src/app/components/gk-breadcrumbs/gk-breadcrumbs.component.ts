import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../global.state';
import { HelpService } from '../../nga/services/help.service';
import { NavigationService } from '../../nga/services/navigation.service';

/**
* @module GkBreadcrumbsComponent
* A bar showing breadcrumbs of the app and other shortcuts, including:
* - return previous transaction code
* - favourite management
* - help on context
* - setting management
* - logout
*
* @param myScope        A unique name to define the scope of component
* @param helpFile       Key part of language file name
* @param helpContext    Content of language file to be displayed
* @param breadcrumbs    An arrays contain breadcrumbs
*
* @function returnPrevious
*/
@Component({
  selector: 'gk-breadcrumbs',
  templateUrl: './gk-breadcrumbs.component.html'
})
export class GkBreadcrumbsComponent implements OnInit, OnDestroy {
  myScope = 'gk-breadcrumbs';

  helpFile: String = 'intro';
  helpContext: String;

  breadcrumbs: Array<Object>;

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
    // Listen to 'help' event
    this.globalState.subscribeEvent('help', this.myScope, (helpFile) => {
      this.helpFile = helpFile;
      this.helpService.getHelpFromHTMLFile(helpFile)
        .subscribe((helpContext) => {
          this.helpContext = helpContext;
          // console.log(helpContext);
        });
    });

    // Listen to 'language' event
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
        'navigation',
        'top_of_history'
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
