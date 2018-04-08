import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';

/**/
import { Store, select } from '@ngrx/store';
import {
  getGkClientAction,
  resetGkClientAction,
  addGkClientAction,
  saveGkClientAction,
  enableGkClientAction,
  disableGkClientAction,
  markGkClientAction,
  unmarkGkClientAction,
  deleteGkClientAction
} from '../../../../../../ngrx/gkClient/gkClients.actions';
/**/

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  TcodeService,
} from '../../../../../../nga/services';

/**********************************************************************************************************
 * FORM SERVES INPUT (11, 13) AND VIEW (12, 14, 15, 16, 17, 18)
 * Input tcode = prefix + action;
 * id & client is to determine client document
 * - Create (11)
 *    No id at first, after saving successfully (201) has client = true then no more SAVE button
 * - Other
 *    Id via URL, if client exist (http status 200) hasClient = true to display form for viewing/ editting
 ***********************************************************************************************************/
@Component({
  selector: 'gkclient-shared',
  templateUrl: './gkclnShared.html',
  styleUrls: ['./gkclnShared.scss'],
})
export class GkClnShared implements OnInit, OnDestroy {

  myScope = 'gkcln-shared';

  @Input() tcode: any;

  id = '';

  prefix = '';
  action = '';

  isRequest = false;
  isEditable = false;
  // Action 11 (before save) and 13 allow form to be editted
  // Request before submit (in Draft) allow form to be editted

  msgs: Message[] = [];

  gkClient: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private translateService: TranslateService,
    private tcodeService: TcodeService,

    private store: Store<any>
  ) {
    this.gkClient = store.pipe(select('gkClient'));
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Only from and after OnInit, all input including isRequest is passed to

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
      }
    });

    this.parseTCode();
  }

  parseTCode() {
    // Parse TCode - this must be in OnInit or after steps, otherwise no input is parsable
    this.prefix = this.tcodeService.extractPrefix(this.tcode);
    this.action = this.tcodeService.extractAction(this.tcode);
    // console.log(this.prefix, this.action);

    switch (this.action) {
      case '11':
        this.store.dispatch(resetGkClientAction());
        this.isEditable = true;
        break;

      case '12':
        this.store.dispatch(getGkClientAction(this.id));
        break;

      case '13':
        this.store.dispatch(getGkClientAction(this.id));
        this.isEditable = true;
        break;

      case '14':
        this.store.dispatch(disableGkClientAction(this.id));
        break;

      case '15':
        this.store.dispatch(enableGkClientAction(this.id));
        break;

      case '16':
        this.store.dispatch(markGkClientAction(this.id));
        break;

      case '17':
        this.store.dispatch(unmarkGkClientAction(this.id));
        break;

      case '18':
        this.store.dispatch(deleteGkClientAction(this.id));
        break;

      case '31':
        // Create new request
        if (!this.id) {
          this.store.dispatch(resetGkClientAction());
        } else {
          // this.gkClientService.findOrCreateRequestById(this.id);
        }
        this.isRequest = true;
        break;

      case '32':
        this.isRequest = true;
        break;

      case '33':
        this.isRequest = true;
        break;

      default:
        break;
    }
  }

  handleEvent(event) {
    // console.log(event);

    if (event.valid) {
      switch (this.action) {
        case '11':
          // console.log('Save master data and present new id + 11/id!');
          this.store.dispatch(addGkClientAction(event.data));
          break;

        case '13':
          // console.log('Save master data!');
          this.store.dispatch(saveGkClientAction(event.data));
          break;

        case '31':
          // console.log('Save detail of request!');
          break;

        case '33':
          // console.log('Save detail of request!');
          break;

        default:
          break;
      }
    } else {
      // console.log('Validation Failed');
      const toastData = {
        type: 'warning',
        title: 'Validation Failed',
        msg: 'Form Validation Failed',
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);
    }
  }

  // handleInFormAction(event) {
  //   switch (event.action) {
  //     case '11':
  //       this.resetGkClient();
  //       break;
  //
  //     default:
  //       break;
  //   }
  // }
  //
  // resetGkClient() {
  //   this.store.dispatch(resetGkClientAction());
  //   this.isEditable = true;
  // }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
