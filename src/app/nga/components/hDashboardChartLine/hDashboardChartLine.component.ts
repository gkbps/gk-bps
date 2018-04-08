import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'h-dashboard-chart-line',
  templateUrl: './hDashboardChartLine.html',
  styleUrls: ['./hDashboardChartLine.scss']
})
export class HDashboardChartLineComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: UIChart;

  @Input() editMode: any;
  @Input() data: any;
  @Input() options: any;

  inEdit = false;

  msgs: Message[];

  positionList = [
    { label: 'Top', value: 'top' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Bottom', value: 'bottom' },
  ];

  constructor() {
  }

  ngOnInit() {
    // console.log(this.editMode);
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

  selectData(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}
