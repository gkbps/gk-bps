import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'h-dashboard-chart-bar',
  templateUrl: './hDashboardChartBar.html',
  styleUrls: ['./hDashboardChartBar.scss']
})
export class HDashboardChartBarComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: UIChart;

  @Input() editMode: any;
  @Input() data: any;
  @Input() options: any;

  inEdit = false;
  stacked: boolean;

  msgs: Message[];

  typeList = [
    { label: 'Vertical Bar', value: 'bar' },
    { label: 'Horizontal Bar', value: 'horizontalBar' }
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
    this.stacked = this.options.scales.yAxes[0].stacked;
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

  updateStacked() {
    // [(ngModel)]="options.scales.yAxes[0].stacked"
    // this.stacked = !this.stacked;
    // console.log(this.stacked);
    this.options.scales.xAxes[0].stacked = this.stacked;
    this.options.scales.yAxes[0].stacked = this.stacked;
  }

  selectData(event) {
      this.msgs = [];
      this.msgs.push({
        severity: 'info',
        summary: 'Data Selected',
        'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
      });
  }
}
