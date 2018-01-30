import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
 * BLANK DASHBOARD COMPONENTS
 */
@Component({
  selector: 'db-grid-3',
  template: ``
})
export class DbGrid3 {
  @Input() hello: string;
  @Input() something: Function;
  @Output() onSomething = new EventEmitter<string>();
}

@Component({
  selector: 'db-grid-4',
  template: ``
})
export class DbGrid4 { }

@Component({
  selector: 'db-grid-5',
  template: ``
})
export class DbGrid5 { }

@Component({
  selector: 'db-grid-6',
  template: ``
})
export class DbGrid6 { }

@Component({
  selector: 'db-grid-7',
  template: ``
})
export class DbGrid7 { }

@Component({
  selector: 'db-grid-8',
  template: ``
})
export class DbGrid8 { }

@Component({
  selector: 'db-grid-9',
  template: ``
})
export class DbGrid9 { }

@Component({
  selector: 'db-grid-12',
  template: ``
})
export class DbGrid12 { }

/*
 * DASHBOARD COMPONENTS - OVEVIEW
 */

@Component({
  selector: 'gk-cln-db-overview-all',
  template: `
    <h-overview-box-header
      [style]="'overview-box-1'"
      [icon]="'view_module'"
      [title]="'All'"
      [figure]="'152'">
    </h-overview-box-header>
  `
})
export class GkClnDbOverviewAll { }

@Component({
  selector: 'gk-cln-db-overview-active',
  template: `
	<h-overview-box-header
	  [style]="'overview-box-2'"
  	  [icon]="'layers'"
	  [title]="'Active'"
	  [figure]="'532'">
	</h-overview-box-header>
  `
})
export class GkClnDbOverviewActive { }

@Component({
  selector: 'gk-cln-db-overview-inactive',
  template: `
	<h-overview-box-header
	  [style]="'overview-box-3'"
	  [icon]="'layers_clear'"
	  [title]="'Inactive'"
	  [figure]="'28'">
	</h-overview-box-header>
  `
})
export class GkClnDbOverviewInactive { }

@Component({
  selector: 'gk-cln-db-overview-marked',
  template: `
    <h-overview-box-header
	  [style]="'overview-box-4'"
	  [icon]="'visibility_off'"
	  [title]="'Mark for deletion'"
	  [figure]="'256'">
	</h-overview-box-header>
  `
})
export class GkClnDbOverviewMarked { }

/*
 * DASHBOARD COMPONENTS - CHART
 */

@Component({
  selector: 'gk-cln-db-chart-doughnut',
  template: `
	<p-chart type="doughnut" [data]="data"></p-chart>
  `
})
export class GkClnDbChartDoughnut {
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
}

@Component({
  selector: 'gk-cln-db-chart-pie',
  template: `
	<p-chart type="pie" [data]="data"></p-chart>
  `
})
export class GkClnDbChartPie {
  data: any;

  constructor() {
	this.data = {
	  labels: ['A','B','C'],
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
		}
	  ]
	};
  }
}


@Component({
  selector: 'gk-cln-db-chart-radar',
  template: `
	<p-chart type="radar" [data]="data"></p-chart>
  `
})
export class GkClnDbChartRadar {
  data: any;

  constructor() {
	this.data = {
	  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
		datasets: [
		  {
			label: 'My First dataset',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [65, 59, 90, 81, 56, 55, 40]
	  	  },
		  {
			label: 'My Second dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [28, 48, 40, 19, 96, 27, 100]
		  }
		]
	};
  }
}

@Component({
	selector: 'gk-cln-db-chart-polar-area',
	template: `
		<p-chart type="polarArea" [data]="data"></p-chart>
	`
})
export class GkClnDbChartPolarArea {
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
		}
  }
}

import { Message } from 'primeng/primeng';
@Component({
	selector: 'gk-cln-db-chart-line',
	template: `
		<p-growl [value]='msgs'></p-growl>
		<p-chart type="line" [data]="data" (onDataSelect)="selectData($event)"></p-chart>
	`
})
export class GkClnDbChartLine {
	data: any;
	msgs: Message[];
  constructor() {
		this.data = {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
						{
								label: 'First Dataset',
								data: [65, 59, 80, 81, 56, 55, 40],
								fill: false,
								borderColor: '#4bc0c0'
						},
						{
								label: 'Second Dataset',
								data: [28, 48, 40, 19, 86, 27, 90],
								fill: false,
								borderColor: '#565656'
						}
				]
		}
	}
	selectData(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }

}
