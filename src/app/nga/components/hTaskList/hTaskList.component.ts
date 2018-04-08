import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['hTaskList.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HTaskListComponent implements OnInit {
  @Input() header = 'Hellow';
  @Input() menuItems: MenuItem[];
  @Input() taskList: any;
  @Input() todos;
  @Input() gkClients;

  constructor(
  ) {

  }

  ngOnInit () {
    // console.log(this.gkClients);
    // console.log(this.menuItems);
  }

}
