import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'h-dashboard',
  templateUrl: './hDashboard.html',
  styleUrls: ['./hDashboard.scss']
})
export class HDashboardComponent implements OnInit {
  @Input() hello: string;
  @Input() something: Function;
  @Output() onSomething = new EventEmitter<string>();

  title = 'Dashboard Component';
  edit = true;
  stdLayoutList = [
    {
      label: '3 / 12',
      value: 'ui-g-3'
    },
    {
      label: '4 / 12',
      value: 'ui-g-4'
    },
    {
      label: '5 / 12',
      value: 'ui-g-5'
    },
    {
      label: '6 / 12',
      value: 'ui-g-6'
    },
    {
      label: '7 / 12',
      value: 'ui-g-7'
    },
    {
      label: '8 / 12',
      value: 'ui-g-8'
    },
    {
      label: '9 / 12',
      value: 'ui-g-9'
    },
    {
      label: '12 / 12',
      value: 'ui-g-12'
    },
  ];

  selectedLayout = 'ui-g-6';

  constructor() {
  }

  ngOnInit() {
  }

  changeEditStatus() {
    this.edit = !this.edit;
  }

  selectLayout() {
    console.log(this.selectedLayout);
  }

}
