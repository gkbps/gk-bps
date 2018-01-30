import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

import { Subscription } from 'rxjs/Subscription';
import { EventService } from './event.service';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  StateManagementService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay = true;
}

@Component({
  templateUrl: 'mine.component.html'
})
export class MineComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'mine';

  // Override Base class properties
  pageTitle = 'home';
  sidebarMenuJSONFile = 'mine.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  title = 'mine';

  navItems: any[];
  public systemImagePath = 'modules/settings/';

  items: MenuItem[];
  taskList: any[];

  locale = 'en-gb';

  events: any[];
  header: any;
  event: MyEvent;
  dialogVisible = false;
  idGen = 100;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private eventService: EventService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
    stateManagementService.initState();
    const currentLang = this.localStorageService.getLang();
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.subscribeLocalState();
    this.initScheduleLang(this.localStorageService.getLang());

    this.eventService.getEvents().then(events => { this.events = events; });
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.initGkTaskList();
  }

  initScheduleLang(lang) {
    /*
     * vi = Vietnamese
     * ja = Japanses
     * ko = Korean
     * fr = French
     * zh-cn = Chinese
     * en-gb = English Greate Britist
     */
    switch (lang) {
      case 'vn':
        this.locale = 'vi';
        break;
      case 'jp':
        this.locale = 'ja';
        break;
      case 'kr':
        this.locale = 'ko';
        break;
      case 'fr':
        this.locale = 'fr';
        break;
      case 'ch':
        this.locale = 'zh-cn';
        break;
      default:
        this.locale = 'en-gb';
    }
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

  handleDayClick(event) {
      this.event = new MyEvent();
      this.event.start = event.date.format();
      this.dialogVisible = true;
  }

  handleEventClick(e) {
      this.event = new MyEvent();
      this.event.title = e.calEvent.title;

      let start = e.calEvent.start;
      let end = e.calEvent.end;
      if (e.view.name === 'month') {
          start.stripTime();
      }

      if (end) {
          end.stripTime();
          this.event.end = end.format();
      }

      this.event.id = e.calEvent.id;
      this.event.start = start.format();
      this.event.allDay = e.calEvent.allDay;
      this.dialogVisible = true;
  }

  saveEvent() {
      // update
      if (this.event.id) {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events[index] = this.event;
        }
      } else {
        // new
        this.event.id = this.idGen++;
        this.events.push(this.event);
        this.event = null;
      }

      this.dialogVisible = false;
  }

  deleteEvent() {
      let index: number = this.findEventIndexById(this.event.id);
      if (index >= 0) {
          this.events.splice(index, 1);
      }
      this.dialogVisible = false;
  }

  findEventIndexById(id: number) {
      let index = -1;
      for (let i = 0; i < this.events.length; i++) {
          if (id === this.events[i].id) {
              index = i;
              break;
          }
      }

      return index;
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translateService.use(lang);
      this.initScheduleLang(lang);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
