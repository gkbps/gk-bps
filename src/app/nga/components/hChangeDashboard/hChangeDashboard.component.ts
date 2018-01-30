import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

// import { PanelModule } from 'primeng/primeng';
import { Header, Footer } from 'primeng/primeng';

@Component({
  selector: 'h-change-dashboard',
  templateUrl: './hChangeDashboard.html',
  styleUrls: ['hChangeDashboard.scss']
})
export class HChangeDashboardComponent implements OnInit {
  @Input() header = '';
  @Input() lastUpdate = '';
  @Input() data: any[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit () { }

}
