import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { Subscription } from 'rxjs/Subscription';
import { EventService } from './event.service';

/**/
import { Store } from '@ngrx/store';
import { getTodosAction } from '../../../ngrx/todo/todos.actions';
/**/

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { MenuService } from '../../../nga/services/menu.service';
import { NavigationService } from '../../../nga/services/navigation.service';

import { StateManagementService } from '../../../nga/services/stateManagement.service';
import { BaseComponent } from '../../base';

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay = true;
}

/**
* @module MineComponent
* Component for personal calendar and tasks
*
* @function initGkTaskList
*
* @function initScheduleLang
* @function handleDayClick
* @function handleEventClick
* @function saveEvent
* @function deleteEvent
* @function findEventIndexById
*/
@Component({
  templateUrl: 'mine.component.html'
})
export class MineComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'mine';

  // Override Base class properties
  pageTitle = 'home';
  sidebarMenuJSONFile = 'home.menu.json';
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

  todos: Observable<any>;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private stateManagementService: StateManagementService,
    private eventService: EventService,
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    stateManagementService.initState();
    const currentLang = this.localStorageService.getLang();

    // Dispatch an action that update store then observe new data
    this.store.dispatch(getTodosAction());
    this.todos = store.select('todos');
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
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


  // FORM OPERATIONS

  /**
  * @function initGkTaskList
  * Initialize Task List
  */
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

  /**
  * @function initScheduleLang
  * Initialize Schedule by in force language
  */
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

  /**
  * @function handleDayClick
  * Show the dialog for creating new event
  */
  handleDayClick(event) {
    this.event = new MyEvent();
    this.event.start = event.date.format();
    this.dialogVisible = true;
  }

  /**
  * @function handleEventClick
  * Show the dialog with selected event for edit
  */
  handleEventClick(e) {
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    const start = e.calEvent.start;
    const end = e.calEvent.end;
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

  /**
  * @function saveEvent
  * Update Event list after dialog closed to refresh the schedule
  */
  saveEvent() {
    // update
    if (this.event.id) {
      const index: number = this.findEventIndexById(this.event.id);
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

  /**
  * @function deleteEvent
  * Delete an event and update the schedule
  */
  deleteEvent() {
    const index: number = this.findEventIndexById(this.event.id);
    if (index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  /**
  * @function findEventIndexById
  * Find the Event based on the event id
  */
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

}
