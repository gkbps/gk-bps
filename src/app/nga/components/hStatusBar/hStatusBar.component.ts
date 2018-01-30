import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-status-bar',
  templateUrl: './hStatusBar.html',
  styleUrls: ['hStatusBar.scss']
})
export class HStatusBarComponent implements OnInit {
  @Input() header = 'Hellow';
  @Input() statusList: string[];

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
