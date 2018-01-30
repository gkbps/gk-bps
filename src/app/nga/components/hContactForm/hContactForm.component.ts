import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SelectItem } from 'primeng/primeng';

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
  selector: 'h-contact-form',
  templateUrl: './hContactForm.html',
  styleUrls: ['hContactForm.scss']
})
export class HContactFormComponent implements OnInit {
  cities: SelectItem[];
  selectedCity: any;

  langSubscription: Subscription;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit () {
    this.initGkContactForm();
  }

  initGkContactForm() {
    this.cities = [];
    this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
    this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
    this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
    this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
    this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});
  }

}
