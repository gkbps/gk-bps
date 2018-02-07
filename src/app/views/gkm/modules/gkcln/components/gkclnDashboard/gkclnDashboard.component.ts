import { Component, Input, Output, EventEmitter } from '@angular/core';

// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputTextModule } from 'primeng/inputtext';
// import { DropdownModule } from 'primeng/dropdown';

Component({
  selector: 'generic-html',
  template: `<ng-content></ng-content>`
})
export class GenericHTML { }

/*
 * BLANK DASHBOARD COMPONENTS
 */
@Component({
  selector: 'db-grid-3',
  template: `
  <div class="{{selectedLayout}}">
    <div class="card">
      <div class="ui-g">

        <div class="ui-g-12">
          <p-toolbar>
            <div class="ui-toolbar-group-left">
              {{title}}
            </div>

            <div class="ui-toolbar-group-right">
              <button pButton type="button" icon="ui-icon-photo-camera" (click)="changeEditStatus()" pTooltip="{{'inProgress'|translate}}" tooltipPosition="top"></button>
              <button pButton type="button" icon="ui-icon-settings-input-component" (click)="changeEditStatus()" pTooltip="{{'inProgress'|translate}}" tooltipPosition="top"></button>
              <button pButton type="button" icon="ui-icon-delete" (click)="gotoTcode('tray13')" pTooltip="{{'completed'|translate}}" tooltipPosition="top"></button>
            </div>
          </p-toolbar>
        </div>

        <div *ngIf="edit" class="ui-g-12">
          <span class="md-inputfield fixed-form">
            <input pInputText type="text" name="type" [(ngModel)]="title"/>
            <label>{{'type'|translate}}</label>
          </span>
          <p-dropdown
            [options]="stdLayoutList"
            [(ngModel)]="selectedLayout"
            placeholder="Select a layout"
            (onChange)="selectLayout()">
          </p-dropdown>
        </div>

        <div *ngIf="!edit" class="ui-g-12">
          Dynamic sample 1 ({{context?.text}})
        </div>

      </div>
    </div>
  </div>
  `
})
export class DbGrid3 {
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

  changeEditStatus() {
    this.edit = !this.edit;
  }

  selectLayout() {
    console.log(this.selectedLayout);
  }
}

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

import { Message } from 'primeng/components/common/api';
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
