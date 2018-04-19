import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { resetRequestCommentsAction } from '../../../../ngrx/requestComment/requestComments.actions';
import { getRequestCommentsAction } from '../../../../ngrx/requestComment/requestComments.actions';
import { addRequestCommentAction } from '../../../../ngrx/requestComment/requestComments.actions';

import { AppConfig } from '../../../../app.config';
import { GlobalState } from '../../../../global.state';
import { HelperService } from '../../../../nga/services/helpers.service';
import { LocalStorageService } from '../../../../nga/services';
import { SecurityService } from '../../../../nga/services';

@Component({
  selector: 'request-comment',
  templateUrl: './requestComment.html',
  styleUrls: ['./requestComment.scss']
})
export class RequestCommentComponent implements OnInit {

  myScope = 'request-comment';

  // Request id
  id = '';

  token = '';
  avatar = '';
  userComment ='';

  // Pagination
  first = 5;
  rows = 5;

  // Store for request document
  storeRequestComments: any;
  requestComments = [];

  constructor(
    private activatedRoute: ActivatedRoute,

    private translate: TranslateService,

    private appConfig: AppConfig,
    private globalState: GlobalState,
    private helperService: HelperService,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,

    private store: Store<any>
  ) {
    // STORE
    this.storeRequestComments = this.store.pipe(select('requestComments'));

    this.storeRequestComments.subscribe(data => {
      console.log(data);
      if (!data.pending && !data.error) {
        this.requestComments = Object.assign([], data.data);

        this.requestComments.forEach(item => {
          const rValue = this.helperService.extractDateTime(item.created_at);
          item['date'] = rValue['date'];
          item['time'] = rValue['time'];
        });

        console.log(this.requestComments);
      }
    });
  }

  ngOnInit () {
    this.subscribeGlobalState();

    this.storeRequestComments.dispatch(resetRequestCommentsAction());

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
        this.storeRequestComments.dispatch(getRequestCommentsAction(this.id, 0, this.rows));
      }
    });

    const lang = this.localStorageService.getLang();
    this.translate.use(lang);

    const user = this.securityService.getCurrentUser();
    this.token = this.securityService.getToken();
    this.avatar = this.avatarToImagePath(user.avatar);
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  // COMPONENT OPERATION

  avatarToImagePath(avatar) {
    return this.avatar = this.appConfig.apiUrl + '/repo/' + this.token + '/users/' + avatar;
  }

  submitComment(event) {
    event.preventDefault();
    console.log(this.id, this.userComment);
    if (this.id) {
      this.storeRequestComments.dispatch(addRequestCommentAction(this.id, this.userComment));
      this.first = this.first + 1;
    }

  }

  loadMore(event) {
    this.storeRequestComments.dispatch(getRequestCommentsAction(this.id, this.first, this.rows));
    this.first = this.first + this.rows;
    console.log('Load more comments');
  }

}
