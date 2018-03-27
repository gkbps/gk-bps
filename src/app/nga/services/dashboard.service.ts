import { Injectable } from '@angular/core';
import { ColorService } from './color.service';

/**
 * DASHBOARD SERVICE
 * Purpose: Standardize the way to process data for dashboard page
 *
 * Operation:
 * - getData...:  GET data in most effective way to reduce requests to server
 * - genData...:  GENerate data to match with standard input for different dashboard
 * - genOptions...: GENerate options for chart dashboard
 * - genLabels...: GENerate labels for time horizon chart dashboard
 *
 * Dependencies:
 * - colorService: To ensure consistent color is applied across dashboard
 */

@Injectable()
export class DashboardHelperService {

  constructor(
    private colorService: ColorService
  ) {
  }

  getDataSource_Status() {
  }

  getDataSource_Category() {

  }
  /*****************************************************************************
   * DASHBOARD - KPI (GEN data and GENerate data)
   * Spot = Balance or combination to reflect compostion
   * - KPI board
   * - PDP = Pie, Doughnut, Polar Area
   *
   * 1. Master Data, Transaction: (Active, Inactive) (Marked, Unmarked)
   * - getDataByStatus
   *
   * 2. Request: (Draft, In progress, ...)
   * - getDataByProgress
   *****************************************************************************/
  getDataByStatus() {
    const data = {
      active: 150,
      inactive: 50,
      marked: 30,
      unmarked: 170
    }
    return data;
  };

  genDataByActiveInactive(src_status) {
    const datasets = [{
      data: [ src_status.active, src_status.inactive ],
      backgroundColor: ['#1FBCD3', '#E72564'],
      hoverBackgroundColor: ['#1FBCD3','#E72564']
    }];
    return datasets;
  }

  genDataByMarkedUnmarked(src_status) {
    const datasets = [{
      data: [ src_status.marked, src_status.unmarked ],
      backgroundColor: ['#616161','#FDC02F'],
      hoverBackgroundColor: ['#616161','#FDC02F'],
    }];
    return datasets;
  }

  genDataByComposite(src_status) {
    const datasets = [
      {
        data: [ src_status.active, src_status.inactive, 0, 0 ],
        backgroundColor: ['#1FBCD3', '#E72564', '#616161','#FDC02F'],
        hoverBackgroundColor: ['#1FBCD3', '#E72564', '#616161','#FDC02F'],
      },
      {
        data: [ 0, 0, src_status.marked, src_status.unmarked ],
        backgroundColor: ['#1FBCD3', '#E72564', '#616161','#FDC02F'],
        hoverBackgroundColor: ['#1FBCD3', '#E72564', '#616161','#FDC02F'],
      }
    ];
    return datasets;
  }

  getDataByProgress(){
    const data = {
      draft: 150,
      inprogress:50,
    }
    return data;
  }

  /*****************************************************************************
   * DASHBOARD - CHART (GET data and GENerate data)
   * Time horizon chart
   * - Line
   * - Bar: Vertical, Horizontal
   *
   * 1. Master Data: Quantity movement overtime
   * - getDataByCat
   *
   * 2. Transaction: Value movement overtime
   * - getDataByCat
   *
   * 2. Request: Quantity movement overtime
   * - getDataByCat
   *****************************************************************************/

  getDataByCat(){
    const data = [
      {
        label: 'Cat1',
        data: [20, 24,26, 30, 35, 37, 40]
      },
      {
        label: 'Cat2',
        data: [30, 35, 39, 42, 47, 53, 60]
      },
      {
        label: 'Cat3',
        data: [10, 12, 13, 16, 20, 28, 30]
      },
      {
        label: 'Cat4',
        data: [40, 45, 50, 58, 64, 66, 70]
      },
    ];
    return data;
  }

  genDataByCatForPDP(source) {
    let labels = [];
    let data = [];

    let len;
    source.forEach((item) => {
      len = item.data.length;
      // console.log(item, len);
      // console.log(item.data[len-1]);
      labels.push(item.label);
      data.push(item.data[len-1]); // Only take the balance number
    });

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.colorService.COLORS,
        hoverBackgroundColor: this.colorService.COLORS,
      }]
    }

  }

  convertRelativeDataByCat(source) {
    const arrSum = this.sumArraysByColumn(source);

    const lenRow = source[0].data.length - 1;
    const lenColumn = source.length - 1;

    let transformed_data = [];
    let item;

    source.forEach((element, index1) => {
      item = {
        label: element.label,
        data: []
      };
      element.data.forEach((value, index2) =>{
        item.data.push(value * 100 / arrSum[index2]);
      });
      transformed_data.push(item);
    });

    return transformed_data;
  }

  sumArraysByColumn(source) {
    const lenRow = source[0].data.length - 1;
    const lenColumn = source.length - 1;
    let arrSum = [];

    let tmpSum;
    for (let i=0; i<=lenRow; i++) {
      tmpSum = 0;
      for (let j=0; j<=lenColumn; j++) {
        tmpSum = tmpSum + source[j].data[i];
      }
      arrSum.push(tmpSum);
    }

    return arrSum;
  }

  genDataByCatForLineAndBar(source, type = 'line') {
    let datasets = JSON.parse(JSON.stringify(source));
    // console.log(datasets);

    if (type==='line') {
      datasets.forEach((item, index) => {
        item['borderColor'] = this.colorService.COLORS[index];
      });
    } else {
      datasets.forEach((item, index) => {
        item['backgroundColor'] = this.colorService.transparentize(this.colorService.COLORS[index], 0.5);
        item['borderColor'] = this.colorService.COLORS[index];
        item['borderWidth'] = 1;
      });
    }
    return datasets;
  }

  genDataByCatForMixed(source){
    let datasets = JSON.parse(JSON.stringify(source));
    datasets.forEach((item, index) => {
      item['type'] = 'bar';
      item['backgroundColor'] = this.colorService.transparentize(this.colorService.COLORS[index], 0.5);
      item['borderColor'] = this.colorService.COLORS[index];
      item['borderWidth'] = 2;
    });

    return datasets;
  }

  // To generate labels for axis based on available data
  genLabelsOnMonths(months) {
    let labels = ['Opening'];
    for (let i=0; i<months-1; i++) {
      labels.push(this.colorService.Months[i]);
    }
    return labels;
  }

  /*****************************************************************************
   * COMMON
   * - CHART (GENerate options and labels)
   *   + PDP char
   *   + Line or Bar char
   *
   * - GRID
   *
   *****************************************************************************/

  // To generate standard options for PDP charts
  genStandardOptionsForPDP(title) {
    const options = {
      responsive: true,
      title: {
       display: true,
       position: 'top',
       text: title
      },
      legend: {
        display: true,
        position: 'bottom',
        reverse: false
      }
    };
    return options;
  }

  // To generate standard options for Line and Bar charts
  genStandardOptionsForLineAndBar(title, stacked = '') {
    const options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: title
      },
      legend: {
        display: true,
        position: 'bottom',
        reverse: false
      }
    };

    switch (stacked) {
      case 'lineStack':
        options['scales'] = {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: true
          }]
        }
        break;

      case 'barStack':
        options['scales'] = {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
        break;
      default:
        options['scales'] = {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: false
          }]
        }
    }

    // console.log(options);
    return options;
  }

  // getGridList is the list of allowed Grid that could be adapted by Dashboard items
  getGridList() {
    const allowedGrid = [
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
      }
    ];
    return allowedGrid;
  }
}
