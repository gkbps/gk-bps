import { Component, OnInit,  OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  StateManagementService,
  ThemeService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

@Component({
  templateUrl: 'setting.component.html'
})
export class SettingComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'setting';

  // Override Base class properties
  pageTitle = 'Setting';
  sidebarMenuJSONFile = 'setting.menu.json';
  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  menu: any[];

  navItems: any[];

  public systemImagePath: String = 'modules/settings/';

  members = [
    'assets/images/avatar1.png',
    'assets/images/avatar2.png',
    'assets/images/avatar3.png'
  ];

  title= 'gkcln00';
  items: MenuItem[];
  taskList: any[];

  messageList: any[];
  statusList: any[];
  globalSales: any[];
  userData: any;

  cars: any;
  data: any;

  msgs: Message[] = [];
  favTopPosition: boolean;
  notificationMode: boolean;
  notificationType: boolean;

  debugMode: boolean;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private themeService: ThemeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    stateManagementService.initState();

  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeLocalState();

    // Derive class initialization
    // Do not initialize Sidebar Menu as this is in page generation
    // this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'setting');

    // Refresh sidebar menu to update Fav menu position
    this.menu = this.initMenu();
    this.refreshSidebarMenu();
    // this.globalState.notifyDataChanged('sidebarMenu', this.menu);

    // Reinstate user preference
    this.favTopPosition = this.localStorageService.getFavPosition();
    this.notificationMode = this.localStorageService.getNotificationMode();
    this.notificationType = this.localStorageService.getNotificationType();
    this.debugMode = this.localStorageService.getDebugMode();

    // Init sample components
    this.initGkNavBoard();
    this.initGkTaskList();
    this.initMessageList();
    this.initStatusList();
    this.initGlobalSale();
    this.initDataTable();
    this.initUserData();
    this.initSchedule();
  }

  initMenu() {
    return [
      { data: { label: 'backToMain', icon: 'dashboard', url: '/home' } },
      {
        data: { label: 'menu_modes', icon: 'settings' },
        children: [
          {
            data: { label: 'static_menu', icon: 'view_quilt',
              command: (event) => {
                this.stateManagementService.wrapperStatic(true);
                // this.app.layoutStatic = true;
              }
            }
          },
          {
            data: { label: 'overlay_menu', icon: 'flip_to-front',
              command: (event) => {
                this.stateManagementService.wrapperStatic(false);
                // this.app.layoutStatic = false;
              }
            }
          },
          {
            data: { label: 'light_menu', icon: 'label',
              command: (event) => {
                this.stateManagementService.sidebarDark(false);
                // this.app.darkMenu = false;
              }
            }
          },
          {
            data: { label: 'dark_menu', icon: 'label_outline',
              command: (event) => {
                this.stateManagementService.sidebarDark(true);
                // this.app.darkMenu = true;
              }
            }
          },
        ]
      },
      {
        data: { label: 'layout_pallete', icon: 'palette' },
        children: [
          {
            data: { label: 'flat', icon: 'format_paint' },
            children: [
              { data: { label: 'blue_grey_green', icon: 'brush', command: (event) => {this.changeLayout('bluegrey'); } } },
              { data: { label: 'indigo_pink', icon: 'brush', command: (event) => {this.changeLayout('indigo'); } } },
              { data: { label: 'pink_amber', icon: 'brush', command: (event) => {this.changeLayout('pink'); } } },
              { data: { label: 'deep_purple_orange', icon: 'brush', command: (event) => {this.changeLayout('deeppurple'); } } },
              { data: { label: 'blue_amber', icon: 'brush', command: (event) => {this.changeLayout('blue'); } } },
              { data: { label: 'light_blue_blue_grey', icon: 'brush', command: (event) => {this.changeLayout('lightblue'); } } },
              { data: { label: 'cyan_amber', icon: 'brush', command: (event) => {this.changeLayout('cyan'); } } },
              { data: { label: 'teal_red', icon: 'brush', command: (event) => {this.changeLayout('teal'); } } },
              { data: { label: 'green_brown', icon: 'brush', command: (event) => {this.changeLayout('green'); } } },
              { data: { label: 'light_green_purple', icon: 'brush', command: (event) => {this.changeLayout('lightgreen'); } } },
              { data: { label: 'lime_blue_grey', icon: 'brush', command: (event) => {this.changeLayout('lime'); } } },
              { data: { label: 'yellow_teal', icon: 'brush', command: (event) => {this.changeLayout('yellow'); } }},
              { data: { label: 'amber_pink', icon: 'brush', command: (event) => {this.changeLayout('amber'); } } },
              { data: { label: 'orange_indigo', icon: 'brush', command: (event) => {this.changeLayout('orange'); } } },
              { data: { label: 'deep_orange_cyan', icon: 'brush', command: (event) => {this.changeLayout('deeporange'); }} },
              { data: { label: 'brown_cyan', icon: 'brush', command: (event) => {this.changeLayout('brown'); } }},
              { data: { label: 'grey_indigo', icon: 'brush', command: (event) => {this.changeLayout('grey'); } }},
            ]
          },
          {
            data: { label: 'special', icon: 'format_paint' },
            children: [
              { data: {label: 'reflection', icon: 'brush', command: (event) => {this.changeLayout('reflection'); } } },
              { data: {label: 'moody', icon: 'brush', command: (event) => {this.changeLayout('moody'); } } },
              { data: {label: 'cityscape', icon: 'brush', command: (event) => {this.changeLayout('cityscape'); } } },
              { data: {label: 'cloudy', icon: 'brush', command: (event) => {this.changeLayout('cloudy'); } } },
              { data: {label: 'storm', icon: 'brush', command: (event) => {this.changeLayout('storm'); } } },
              { data: {label: 'palm', icon: 'brush', command: (event) => {this.changeLayout('palm'); } } },
              { data: {label: 'flatiron', icon: 'brush', command: (event) => {this.changeLayout('flatiron'); } } }
            ]
          },
        ]
      },
      {
          data: { label: 'themes', icon: 'brush', badge: '5' },
          children: [
            { data: {label: 'blue_grey_green', icon: 'brush', command: (event) => {this.changeTheme('bluegrey'); }}},
            { data: {label: 'indigo_pink', icon: 'brush', command: (event) => {this.changeTheme('indigo'); }}},
            { data: {label: 'pink_amber', icon: 'brush', command: (event) => {this.changeTheme('pink'); }}},
            { data: {label: 'purple_pink', icon: 'brush', command: (event) => {this.changeTheme('purple'); }}},
            { data: {label: 'deep_purple_orange', icon: 'brush', command: (event) => {this.changeTheme('deeppurple'); }}},
            { data: {label: 'blue_amber', icon: 'brush', command: (event) => {this.changeTheme('blue'); }}},
            { data: {label: 'light_blue_blue_grey', icon: 'brush', command: (event) => {this.changeTheme('lightblue'); }}},
            { data: {label: 'cyan_amber', icon: 'brush', command: (event) => {this.changeTheme('cyan'); }}},
            { data: {label: 'teal_red', icon: 'brush', command: (event) => {this.changeTheme('teal'); }}},
            { data: {label: 'green_brown', icon: 'brush', command: (event) => {this.changeTheme('green'); }}},
            { data: {label: 'light_green_purple', icon: 'brush', command: (event) => {this.changeTheme('lightgreen'); }}},
            { data: {label: 'lime_blue_grey', icon: 'brush', command: (event) => {this.changeTheme('lime'); }}},
            { data: {label: 'yellow_teal', icon: 'brush', command: (event) => {this.changeTheme('yellow'); }}},
            { data: {label: 'amber_pink', icon: 'brush', command: (event) => {this.changeTheme('amber'); }}},
            { data: {label: 'orange_indigo', icon: 'brush', command: (event) => {this.changeTheme('orange'); }}},
            { data: {label: 'deep_orange_cyan', icon: 'brush', command: (event) => {this.changeTheme('deeporange'); }}},
            { data: {label: 'brown_cyan', icon: 'brush', command: (event) => {this.changeTheme('brown'); }}},
            { data: {label: 'grey_indigo', icon: 'brush', command: (event) => {this.changeTheme('grey'); }}},
          ]
      },
      {
          data: {label: 'preference', icon: 'format_color_fill'},
          children: [
            {
              data:
                {
                  label: 'fav_position', icon: 'favorite',
                  command: (event) => {
                    this.refreshSidebarMenu(true);
                  }
                }
              },
              {
                data: {label: 'navType', icon: 'navigation'},
                children: [
                  {
                    data: {label: 'shape', icon: 'navigation'},
                    children: [
                      { data: {label: 'circle_shape', icon: 'hdr_weak',
                        command: (event) => {this.globalState.notifyMyDataChanged('navType', '', 'circle'); }}},
                      { data: {label: 'square_shape', icon: 'crop_portrait',
                        command: (event) => {this.globalState.notifyMyDataChanged('navType', '', 'square'); }}},
                    ]
                  },
                  {
                    data: {label: 'shape_effect', icon: 'blur_circular'},
                    children: [
                      { data: {label: 'Effect 1', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect1'); }}},
                      { data: {label: 'Effect 2', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect2'); }}},
                      { data: {label: 'Effect 3', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect3'); }}},
                      { data: {label: 'Effect 4', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect4'); }}},
                      { data: {label: 'Effect 5', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect5'); }}},
                      { data: {label: 'Effect 6', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect6'); }}},
                      { data: {label: 'Effect 7', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect7'); }}},
                      { data: {label: 'Effect 8', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect8'); }}},
                      { data: {label: 'Effect 9', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect9'); }}},
                      { data: {label: 'Effect 10', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect10'); }}},
                      { data: {label: 'Effect 11', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect11'); }}},
                      { data: {label: 'Effect 12', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect12'); }}},
                      { data: {label: 'Effect 13', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect13'); }}},
                      { data: {label: 'Effect 14', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect14'); }}},
                      { data: {label: 'Effect 15', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect15'); }}},
                      { data: {label: 'Effect 16 (Circle only)', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect16'); }}},
                      { data: {label: 'Effect 17 (Circle only)', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect17'); }}},
                      { data: {label: 'Effect 18 (Circle only)', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect18'); }}},
                      { data: {label: 'Effect 19 (Circle only)', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect19'); }}},
                      { data: {label: 'Effect 20 (Circle only)', icon: 'blur_on',
                        command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect20'); }}},
                    ]
                  },
                ]
              },
              {
                data: {label: 'alertType', icon: 'notifications'},
                children: [
                  {
                    data:
                    {
                      label: 'notification_toggle', icon: 'notifications',
                      command: (event) => {
                        this.notificationMode = !this.notificationMode;
                        this.globalState.notifyMyDataChanged('notificationMode', '', this.notificationMode);
                      }
                    }
                  },
                  { data: {label: 'growl', icon: 'chat',
                      command: (event) => {
                        this.globalState.notifyMyDataChanged('notificationType', '', true);
                        this.notificationType = true;
                        this.msgs = [];
                        this.msgs.push({severity: 'info', summary: 'Notification Style!', detail: 'Testing, testing, testing...'});
                      }
                    }
                  },
                  { data: {label: 'message', icon: 'view_headline',
                    command: (event) => {
                        this.globalState.notifyMyDataChanged('notificationType', '', false);
                        this.notificationType = false;
                        this.msgs = [];
                        this.msgs.push({severity: 'info', summary: 'Notification Style!', detail: 'Testing, testing, testing...'});
                        setTimeout(() => {
                          this.msgs = [];
                        }, 5000);
                      }
                    }
                  }
                ]
              },
              {
                data:
                {
                  label: 'debug_toggle', icon: 'bug_report',
                  command: (event) => {
                    this.debugMode = !this.debugMode;
                    this.globalState.notifyMyDataChanged('debugMode', '', this.debugMode);
                  }
                }
              },
          ]
      },
    ];
  }

  changeLayout(layout) {
    console.log(layout);
    this.themeService.changeLayout(layout);
    return false;
  }

  changeTheme(theme) {
    console.log(theme);
    this.themeService.changeTheme(theme);
    return false;
  }

  refreshSidebarMenu(toggle: boolean = false) {
    const fav = this.localStorageService.getFav();
    const currentPosition = this.localStorageService.getFavPosition();
    this.favTopPosition = toggle ? !currentPosition : currentPosition;
    console.log(this.favTopPosition);

    if (this.favTopPosition) {
      fav.push(...this.menu);
      console.log(fav);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', fav);
    } else {
      const changedMenu = [...this.menu, ...fav];
      console.log(changedMenu);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', changedMenu);
    }

    this.localStorageService.setFavPosition(this.favTopPosition);
  }

  initGkNavBoard() {
    const imgPath = this.systemImagePath + 'circle/';
    const squareImgPath = this.systemImagePath + 'square/';

    this.navItems = [
      {
        'url': '',
        'img': imgPath + '1.jpg',
        'squareImg': squareImgPath + '1.jpg',
        'tcode': 'gkcln00',
        'title': 'gkcln00' // 'GK Clients Management'
      },
      {
        'url': '',
        'img': imgPath + '2.jpg',
        'squareImg': squareImgPath + '2.jpg',
        'tcode': 'gksol00',
        'title': 'gksol00' // 'GK Solutions Processing'
      },
      {
        'url': '',
        'img': imgPath + '3.jpg',
        'squareImg': squareImgPath + '3.jpg',
        'tcode': 'gktcd00',
        'title': 'gktcd00' // 'GK Tcodes Management'
      },
      {
        'url': '',
        'img': imgPath + '4.jpg',
        'squareImg': squareImgPath + '4.jpg',
        'tcode': 'gkcln00',
        'title': 'gkcln00' // 'GK Clients Management'
      },
      {
        'url': '',
        'img': imgPath + '5.jpg',
        'squareImg': squareImgPath + '5.jpg',
        'tcode': 'gksol00',
        'title': 'gksol00' // 'GK Solutions Processing'
      },
      {
        'url': '',
        'img': imgPath + '6.jpg',
        'squareImg': squareImgPath + '6.jpg',
        'tcode': 'gktcd00',
        'title': 'gktcd00' // 'GK Tcodes Management'
      },
      {
        'url': '',
        'img': imgPath + '7.jpg',
        'squareImg': squareImgPath + '7.jpg',
        'tcode': 'gkcln00',
        'title': 'gkcln00' // 'GK Clients Management'
      },
      {
        'url': '',
        'img': imgPath + '8.jpg',
        'squareImg': squareImgPath + '8.jpg',
        'tcode': 'gksol00',
        'title': 'gksol00' // 'GK Solutions Processing'
      }
    ];
  }

  initGkTaskList() {
    this.items = [{
        label: 'File',
        items: [
            {label: 'New', icon: 'ui-icon-add'},
            {label: 'Open', icon: 'ui-icon-search'}
        ]
    },
    {
        label: 'Edit',
        items: [
            {label: 'Undo', icon: 'ui-icon-undo'},
            {label: 'Redo', icon: 'ui-icon-redo'}
        ]
    }];

    this.taskList = [
      {
        status: false,
        label: 'Sales Reports',
        icon: 'shop'
      },
      {
        status: true,
        label: 'Pay Invoices',
        icon: 'credit_card'
      },
    ];

  }

  initMessageList() {
    this.messageList = [
      {
        'img': 'assets/images/avatar1.png',
        'name': 'Joshua Williams',
        'text': 'Sales reports attached.'
      },
      {
        'img': 'assets/images/avatar2.png',
        'name': 'Emily Watson',
        'text': 'Meeting at 2pm tomorrow.'
      },
    ];
  }

  initStatusList() {
    this.statusList = [
      {
        'style': 'status-bar-1',
        'progress': '22%',
        'label': 'Users',
        'icon': ''
      },
      {
        'style': 'status-bar-2',
        'progress': '78%',
        'label': 'Confirmed',
        'icon': ''
      },
      {
        'style': 'status-bar-3',
        'progress': '51%',
        'label': 'Defects',
        'icon': ''
      },
      {
        'style': 'status-bar-4',
        'progress': '68%',
        'label': 'Issues',
        'icon': ''
      },
      {
        'style': 'status-bar-5',
        'progress': '80%',
        'label': 'Searches',
        'icon': ''
      },
    ];
  }

  initGlobalSale() {
    this.globalSales = [
      {
        'img': 'assets/images/dashboard/flag-brazil.png',
        'label': 'BRAZIL',
        'figure': '4234',
        'percent': '35%',
        'change': 1
      },
      {
        'img': 'assets/images/dashboard/flag-china.png',
        'label': 'CHINA',
        'figure': '3214',
        'percent': '25%',
        'change': 1
      },
      {
        'img': 'assets/images/dashboard/flag-belgium.png',
        'label': 'BELGIUM',
        'figure': '2842',
        'percent': '28%',
        'change': 1
      },
      {
        'img': 'assets/images/dashboard/flag-france.png',
        'label': 'FRANCE',
        'figure': '1942',
        'percent': '15%',
        'change': -1
      },
      {
        'img': 'assets/images/dashboard/flag-uk.png',
        'label': 'UK',
        'figure': '1956',
        'percent': '25%',
        'change': -1
      },
    ];
  }

  initDataTable() {
    this.cars = [
      { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black', price: 500 },
      { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White', price: 1000 },
      { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue', price: 400 },
      { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White', price: 600 },
      { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red', price: 700 },
      { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue', price: 650 },
      { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow', price: 750 },
      { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown', price: 470 },
      { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black', price: 610 },
    ];
  }

  initUserData() {
    this.userData = [
      {
        'icon': 'assignment',
        'label': 'Tasks',
        'text': '3 open',
        'progress': '50%'
      },
      {
        'icon': 'attach_money',
        'label': 'Revenue',
        'text': '+20%',
        'progress': '20%'
      },
      {
        'icon': 'payment',
        'label': 'Payments',
        'text': '24 new',
        'progress': '65%'
      },
      {
        'icon': 'business_center',
        'label': 'Clients',
        'text': '+80%',
        'progress': '80%'
      },
      {
        'icon': 'pie_chart',
        'label': 'Turnover',
        'text': '+40%',
        'progress': '40%'
      },
    ];
  }

  initSchedule() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }

  selectData(event) {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Data Selected',
      'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.globalState.unsubscribeEvent('notificationMode', this.myScope);
    this.globalState.unsubscribeEvent('notificationType', this.myScope);
    this.globalState.unsubscribeEvent('debugMode', this.myScope);
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('notificationMode', this.myScope, (notificationMode) => {
      console.log(notificationMode);
      this.notificationMode = notificationMode;
      this.localStorageService.setNotificationMode(notificationMode);
    });

    this.globalState.subscribeEvent('notificationType', this.myScope, (notificationType) => {
      console.log(notificationType);
      this.notificationType = notificationType;
      this.localStorageService.setNotificationType(notificationType);
    });

    this.globalState.subscribeEvent('debugMode', this.myScope, (debugMode) => {
      console.log(debugMode);
      this.debugMode = debugMode;
      this.localStorageService.setDebugMode(debugMode);
    });
  }
}
