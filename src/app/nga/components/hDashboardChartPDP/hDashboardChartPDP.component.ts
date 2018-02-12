import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'h-dashboard-chart-pdp',
  templateUrl: './hDashboardChartPDP.html',
  styleUrls: ['./hDashboardChartPDP.scss']
})
export class HDashboardChartPDPComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: UIChart;

  @Input() editMode: any;
  @Input() data: any;
  @Input() options: any;

  inEdit = false;

  typeList = [
    { label: 'Pie', value: 'pie' },
    { label: 'Doughnut', value: 'doughnut' },
    { label: 'Polar Area', value: 'polarArea' },
  ];

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
