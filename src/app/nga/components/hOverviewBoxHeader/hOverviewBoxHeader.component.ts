import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-overview-box-header',
  templateUrl: './hOverviewBoxHeader.html',
  styleUrls: ['hOverviewBoxHeader.scss']
})
export class HOverviewBoxHeaderComponent implements OnInit {
  @Input() style = 'task-box-1';
  @Input() icon = '';
  @Input() title = '';
  @Input() figure = '';

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
