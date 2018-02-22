// External
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

// Internal
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services';

@Component({
  selector: 'h-address',
  templateUrl: './hAddress.html',
  styleUrls: ['./hAddress.scss'],
})
export class HAddress implements OnInit, OnDestroy {

  myScope = 'h-Address';

  @Input() isEditable = false;
  @Input() item: number;
  @Input('formGroup') public addressItem: FormGroup;

  @Output() itemEvent: EventEmitter<any> = new EventEmitter();
  editStatus = false;

  langSubscription: Subscription;

  constructor(
    private translate: TranslateService,

    private globalState: GlobalState,
    private localStorage: LocalStorageService,
  ) {
    // this.subscribeGlobalState();
  }

  ngOnInit () {
    this.setControlStatus();
  }

  removeAddress() {
    this.itemEvent.emit({ action: 'removeAddress', itemIndex: this.item });
  }

  /*
  updateAddress() {
    this.itemEvent.emit({ action: 'updateAddress', itemIndex: this.item });
  }
  */

  setControlStatus() {
    if (this.isEditable) {
      this.addressItem.controls.type.enable();
      this.addressItem.controls.line1.enable();
      this.addressItem.controls.line2.enable();
      this.addressItem.controls.line3.enable();
      this.addressItem.controls.line4.enable();
      this.addressItem.controls.line5.enable();
    } else {
      this.addressItem.controls.type.disable();
      this.addressItem.controls.line1.disable();
      this.addressItem.controls.line2.disable();
      this.addressItem.controls.line3.disable();
      this.addressItem.controls.line4.disable();
      this.addressItem.controls.line5.disable();
    }
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
