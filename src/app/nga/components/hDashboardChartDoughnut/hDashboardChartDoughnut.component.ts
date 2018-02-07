import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'h-dashboard-chart-doughnut',
  templateUrl: './hDashboardChartDoughnut.html',
  styleUrls: ['./hDashboardChartDoughnut.scss']
})
export class HDashboardChartDoughnutComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
	  labels: ['A', 'B', 'C'],
      datasets: [
        {
		  data: [300, 50, 100],
		  backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		  ],
		  hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		  ]
		}]
	  };
    
  }

  ngOnInit() {
  }

}
