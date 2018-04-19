import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../../../app.config';
import { GlobalState } from '../../../../global.state';
import { LocalStorageService } from '../../../../nga/services';
import { SecurityService } from '../../../../nga/services';

@Component({
  selector: 'al-comment',
  templateUrl: './alComment.html',
  styleUrls: ['./alComment.scss']
})
export class AlCommentComponent implements OnInit {

  myScope = 'al-comment';

  token = '';
  avatar = '';
  userComment ='';

  list = [
    {
      username: 'htdong',
      fullname: 'Maria Gonzales',
      avatar: 'default.png',
      time: '8:03 PM Today',
      comment: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      username: 'htdong',
      fullname: 'Nora Havisham',
      avatar: 'default.png',
      time: '8:03 PM Today',
      comment: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.'
    }
  ]

  constructor(
    private translate: TranslateService,

    private appConfig: AppConfig,
    private globalState: GlobalState,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit () {
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
    console.log(this.userComment);
  }

  loadMore(event) {
    console.log('Load more comments');
  }

}
