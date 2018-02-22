// External
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services';

@Component({
  selector: 'h-contact',
  templateUrl: './hContact.html',
  // styleUrls: ['./individualNav.scss'],
})
export class HContact implements OnInit, OnDestroy {

  myScope = 'h-contact';

  @Input() isEditable = false;
  @Input() item: number;
  @Input('formGroup') public contactItem: FormGroup;

  @Output() itemEvent: EventEmitter<any> = new EventEmitter();
  editStatus = false;

  constructor(
    private globalState: GlobalState,
    private localStorage: LocalStorageService,
    private translate: TranslateService,
  ) {
    // this.subscribeGlobalState();
  }

  ngOnInit () {
    this.setControlStatus();
  }

  removeContact() {
    this.itemEvent.emit({ action: 'removeContact', itemIndex: this.item });
  }

  updateContact() {
    this.itemEvent.emit({ action: 'updateContact', itemIndex: this.item });
  }

  setControlStatus() {
    if (this.isEditable) {
      this.contactItem.controls.name.enable();
      this.contactItem.controls.title.enable();
      this.contactItem.controls.phone.enable();
      this.contactItem.controls.email.enable();
    } else {
      this.contactItem.controls.name.disable();
      this.contactItem.controls.title.disable();
      this.contactItem.controls.phone.disable();
      this.contactItem.controls.email.disable();
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
