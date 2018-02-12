import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IconsService } from '../../../nga/common/icons.service';

@Component({
  selector: 'h-dashboard-kpi',
  templateUrl: './hDashboardKPI.html',
  styleUrls: ['./hDashboardKPI.scss']
})
export class HDashboardKPIComponent implements OnInit {

  @Input() editMode: any;
  @Input() data: any;
  @Input() options: any;
  @Input() something: Function;
  @Output() onSomething = new EventEmitter<string>();

  inEdit = false;
  iconList: any;

  styleList = [
    {label: 'Overview Box 1', value: 'overview-box-1'},
    {label: 'Overview Box 2', value: 'overview-box-2'},
    {label: 'Overview Box 3', value: 'overview-box-3'},
    {label: 'Overview Box 4', value: 'overview-box-4'}
  ];

  constructor(
    private iconsService: IconsService
  ) {
    this.iconList = iconsService.getIconsMenu();
  }

  ngOnInit() {
  }

  changeInEdit() {
    this.inEdit = !this.inEdit;
  }
}
