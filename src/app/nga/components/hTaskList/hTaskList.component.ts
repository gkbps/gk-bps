import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

import {
  SecurityService,
  TcodeService,
  NavigationService,
  LocalStorageService,
  ObjectService,
} from '../../../nga/services';

@Component({
  selector: 'h-task-list',
  templateUrl: './hTaskList.html',
  styleUrls: ['hTaskList.scss']
})
export class HTaskListComponent implements OnInit {
  @Input() header = 'Hellow';
  @Input() menuItems: MenuItem[];
  @Input() taskList: any;

  constructor(
  ) {

  }

  ngOnInit () {
    console.log(this.menuItems);
  }

}
