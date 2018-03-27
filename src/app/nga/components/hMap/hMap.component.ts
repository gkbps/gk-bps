import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-map',
  templateUrl: './hMap.html',
  styleUrls: ['hMap.scss']
})
export class HMapComponent implements OnInit {
  @Input() header = 'Hellow';
  @Input() image = '';

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
