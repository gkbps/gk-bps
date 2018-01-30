import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-map',
  templateUrl: './hMap.html',
  styleUrls: ['hMap.scss']
})
export class HMapComponent implements OnInit {
  @Input() header: string = 'Hellow';
  @Input() image: string = '';

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
