import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-message-list',
  templateUrl: './hMessageList.html',
  styleUrls: ['hMessageList.scss']
})
export class HMessageListComponent implements OnInit {
  @Input() header = '';
  @Input() messageList: any[];

  constructor(
  ) {

  }

  ngOnInit () {
  }

}
