import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-user-card',
  templateUrl: './hUserCard.html',
  styleUrls: ['hUserCard.scss']
})
export class HUserCardComponent implements OnInit {
  @Input() bgImage = '';
  @Input() userAvatar = '';
  @Input() userName = '';
  @Input() data: any[];

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
