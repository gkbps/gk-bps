import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-task-box',
  templateUrl: './hTaskBox.html',
  styleUrls: ['./hTaskBox.scss']
})
export class HTaskBoxComponent implements OnInit {
  @Input() style = 'task-box-1';
  @Input() header = '';
  @Input() text = '';
  @Input() status = '';
  @Input() members: string[];

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
