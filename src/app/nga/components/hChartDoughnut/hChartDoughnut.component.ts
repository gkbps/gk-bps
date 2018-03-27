import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-chart-doughnut',
  templateUrl: './hChartDoughnut.html',
  styleUrls: ['hChartDoughnut.scss']
})
export class HChartDoughnutComponent implements OnInit {
  @Input() data: any;

  constructor(
  ) {
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
		   }
     ]
	  };
  }

  ngOnInit () {
  }

}
