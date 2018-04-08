import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Internal
import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { SecurityService } from '../../../nga/services/security.service';

import { BaseComponent } from '../../base';

import { TerminalService } from 'primeng/components/terminal/terminalservice';

/**
* @module GkTerminalComponent
* Terminal page
*
* @function initTerminal
*/
@Component({
  selector: 'gk-terminal',
  templateUrl: 'gkTerminal.component.html'
})
export class GkTerminalComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'gk-terminal';

  // Override Base class properties
  pageTitle = 'terminal';
  sidebarMenuJSONFile = 'home.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  user: any;
  response: any;

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private router: Router,
    private terminalService: TerminalService,
    private security: SecurityService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'terminal');
    this.initTerminal();
  }

  /**
  * @function initTerminal
  * Initialize Terminal
  */
  initTerminal() {
    this.user = this.security.getCurrentUser();

    this.terminalService.commandHandler.subscribe(command => {

      const parts = command.toLowerCase().trim().split(' ');
      // console.log(parts);
      switch (parts[0]) {
        case 'date':
          this.response = {response: 'Today is: ' + new Date().toDateString()};
          break;

        case 'clear':
          switch (parts[1]) {
            case 'error':
              this.localStorageService.clearError();
              break;
            default:
              break;
            }
          break;

        case 'show':
          let data;

          switch (parts[1]) {
            case 'error':
              if (parts[2] === 'last') {
                data = JSON.parse(this.localStorageService.getErrors(true));
              } else {
                data = JSON.parse(this.localStorageService.getErrors(false));
              }
              this.response = data;
              break;

            case 'lang':
              data = this.localStorageService.getLang();
              this.response = {response: `Current language is "${this.localStorageService.getLang()}"`};
              break;

            case 'wklge':
              data = this.localStorageService.getWkLge();
              this.response = {response: `Working Legal Entity is "${data}"`};
              break;

            case 'wkyear':
              data = this.localStorageService.getWkYear();
              this.response = {response: `Working Year is "${data}"`};
              break;

            default:
              this.response = { response: 'List of typical commands',
                commands: [
                  {
                    show: 'List out...',
                    options: [
                      { error: 'To show list of error(s) during system operation',
                        options: [
                          { none: 'To show list of all errors'},
                          { last: 'To show the last error'},
                        ]
                      },
                      {
                        lang: 'To show the current language'
                      },
                      { wklge: 'To show working legal entity' },
                      { wkyear: 'To show working year' },
                    ]
                  }
                ]
              };
              break;
          }
          break;

        case 'login':
        case 'logout':
          this.response = {response: 'Goodbye!...'};
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
          break;

        case 'hello':
          this.response = {response: 'Hi there'};
          if (parts[1]) {
            this.response = { response: 'Hi there ' + parts[1] };
          }
          break;

        default:
          this.response = {response: 'Unknown command: ' + command};
      }

    });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
