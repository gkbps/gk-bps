import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'h-dashboard-chart-polar-area',
  templateUrl: './hDashboardChartPolarArea.html',
  styleUrls: ['./hDashboardChartPolarArea.scss']
})
export class HDashboardChartPolarAreaComponent implements OnInit {
  data: any;

  constructor() {
    this.data = {
				datasets: [{
						data: [
								11,
								16,
								7,
								3,
								14
						],
						backgroundColor: [
								'#FF6384',
								'#4BC0C0',
								'#FFCE56',
								'#E7E9ED',
								'#36A2EB'
						],
						label: 'My dataset'
				}],
				labels: [
						'Red',
						'Green',
						'Yellow',
						'Grey',
						'Blue'
				]
		};

  }

  ngOnInit() {
  }

}
