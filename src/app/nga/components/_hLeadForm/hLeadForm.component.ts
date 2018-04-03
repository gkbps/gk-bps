// External
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { GlobalState } from '../../../global.state';
import {
  NavigationService,
} from '../../../nga/services';

@Component({
  selector: 'h-lead-form',
  templateUrl: './hLeadForm.html',
})
export class HLeadForm implements OnInit, OnDestroy {

  myScope = 'h-lead-form';
  @Input() isShortTcode = false;

  currentUser: any;
  userRights: string[];

  myForm: FormGroup;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private translate: TranslateService,

    private globalState: GlobalState,
    private navigationService: NavigationService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit () {
    this.navigationService.trackHistory();
    this.initForm();
  }

  private initForm() {
    this.myForm = this._fb.group({
      id: ['', [Validators.required]],
    });
  }

  execute(): void {
    if (!this.isShortTcode) {
      const urlComponents = this.router.url.split('/');
      // console.log(urlComponents);
      const url = '/' + urlComponents[1] + '/' + urlComponents[2] + '/' + this.myForm.controls['id'].value;
      console.log(url);
      this.router.navigate([url]);
    } else {
      const urlComponents = this.router.url.split('/');
      const url = '/' + urlComponents[1] + '/' + this.myForm.controls['id'].value;
      console.log(url);
      this.router.navigate([url]);
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
