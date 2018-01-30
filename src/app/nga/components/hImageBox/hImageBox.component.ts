import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import {
  SecurityService,
  TcodeService,
  NavigationService,
  LocalStorageService,
  ObjectService,
} from '../../../nga/services';

@Component({
  selector: 'h-image-box',
  templateUrl: './hImageBox.html',
  styleUrls: ['hImageBox.scss']
})
export class HImageBoxComponent implements OnInit {
  @Input() image = '';
  @Input() header = '';
  @Input() icon = '';

  langSubscription: Subscription;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit () {
  }

}
