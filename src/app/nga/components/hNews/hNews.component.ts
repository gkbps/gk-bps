import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-news',
  templateUrl: './hNews.html',
  styleUrls: ['hNews.scss']
})
export class HNewsComponent implements OnInit {
  @Input() header = 'h-News';
  @Input() image = '';

  news: any;
  colours = [
    'green',
    'orange',
    'pink',
    'blue',
    'grey',
  ];

  constructor(
  ) {

  }

  ngOnInit () {
    this.news = [
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 1',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 2',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 3',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 4',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 5',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 6',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 7',
        headline: 'Find out what learning events we have coming up near you.',
      },
      {
        image: 'assets/images/insights/test1.jpg',
        title: 'Events 8',
        headline: 'Find out what learning events we have coming up near you.',
      },
    ];
  }

}
