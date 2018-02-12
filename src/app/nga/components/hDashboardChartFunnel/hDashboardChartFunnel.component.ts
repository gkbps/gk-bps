import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'h-dashboard-funnel',
  templateUrl: './hDashboardChartFunnel.html',
  styleUrls: ['./hDashboardChartFunnel.scss']
})
export class HDashboardChartFunnelComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: UIChart;

  @Input() editMode: any;
  @Input() data: any;
  @Input() options: any;

  inEdit = false;

  positionList = [
    { label: 'Top', value: 'top' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Bottom', value: 'bottom' },
  ];

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.chartType) {
    //   console.log(changes.chartType);
    //   // console.log(changes.chartType.currentValue);
    //
    // }
  }

  changeInEdit() {
    this.inEdit = !this.inEdit;
  }
  
}
