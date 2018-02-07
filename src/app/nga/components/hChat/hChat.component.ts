import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';

import { Component, OnInit, OnDestroy, AfterViewChecked, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../../../app.config';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import { ChatService } from '../../../nga/services/chat.service';

import {
  SecurityService,
  TcodeService,
  NavigationService,
  LocalStorageService,
  ObjectService,
} from '../../../nga/services';

@Component({
  selector: 'h-chat',
  templateUrl: './hChat.html',
  styleUrls: ['hChat.scss']
})
export class HChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  myScope = 'h-chat';

  header = 'Chat';
  chatData: any[] = [{ data: { 'r': 'about' }}];

  user: any;
  username: any;
  userAvatar: string;
  invitedUser: string;
  token: string;

  userList: any;
  contact = '';

  selectedChatRoomIndex: any;
  selectedChatRoomId: any;
  comment = '';

  chatLanguage = {
    chat_inviting: '{{value1}} is inviting {{value2}} to join discussion',
    chat_joining_question: 'Will you join room to chat with {{value}}?',
    chat_joining: 'Hi there, {{value}} entered the room',
    chat_leaving_question: 'Are you sure to leave the room?',
    chat_leaving: '{{value}} left the room'
  };

  constructor(
    private router: Router,
    private appConfig: AppConfig,
    private domSanitizer: DomSanitizer,
    private securityService: SecurityService,
    private changeDetectorRef: ChangeDetectorRef,
    private globalState: GlobalState,
    private chatService: ChatService,

    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService
  ) {
    this.subscribeGlobalState();
  }

  // To refresh chatLanguage after language changed
  updateLanguageChange() {
    this.translateService.get('chat_joining_question', {value: this.username})
      .subscribe((res) => {
        this.chatLanguage['chat_joining_question'] = res;
      });

    this.translateService.get('chat_joining', {value: this.username})
      .subscribe((res) => {
        this.chatLanguage['chat_joining'] = res;
      });

    this.translateService.get('chat_leaving', {value: this.username})
      .subscribe((res) => {
        this.chatLanguage['chat_leaving'] = res;
      });

    this.translateService.get(['chat_leaving_question'])
      .subscribe((res) => {
        this.chatLanguage['chat_leaving_question'] = res.chat_leaving_question;
      });
    // console.log(this.chatLanguage);
  }

  ngOnInit () {
    this.translateService.use(this.localStorageService.getLang());

    this.initChatter();
    this.initContactList();
    this.initChatRoom();
    this.updateLanguageChange();
  }

  initChatter() {
    this.user = this.securityService.getCurrentUser();
    this.username = this.user.username;
    this.userAvatar = this.user.avatar;
    this.token = this.securityService.getToken();
  }

  initContactList() {
    this.userList = [
        { username: 'sender', avatar: 'htdong.png', firstname: 'Sender', lastname: 'GK|BPS', title: 'Sender'},
        { username: 'requestor', avatar: 'ltpthao.png', firstname: 'Requestor', lastname: 'GK|BPS', title: 'Requestor'},
        { username: 'gkpic', avatar: 'hgkhanh.png', firstname: 'PIC', lastname: 'GK|BPS', title: 'PIC'},
        { username: 'approver1', avatar: 'htdong.png', firstname: 'Approver 1', lastname: 'GK|BPS', title: 'Approver 1'},
        { username: 'approver2', avatar: 'ltpthao.png', firstname: 'Approver 2', lastname: 'GK|BPS', title: 'Approver 2'},
        { username: 'lastapprover', avatar: 'hgkhanh.png', firstname: 'Last Approver', lastname: 'GK|BPS', title: 'Last Approver'},
        { username: 'invited', avatar: 'htdong.png', firstname: 'Invited Approver', lastname: 'GK|BPS', title: 'Invited Approver'},
        { username: 'ltpthao', avatar: 'ltpthao.png', firstname: 'Thao', lastname: 'Le', title: 'CFO & Admin'},
        { username: 'hgkhanh', avatar: 'hgkhanh.png', firstname: 'Khanh', lastname: 'Hoang', title: 'Chairman'},
        { username: 'htdong', avatar: 'htdong.png', firstname: 'Dong', lastname: 'Hoang', title: 'Founder & CEO'},
        { username: 'ltpthao', avatar: 'ltpthao.png', firstname: 'Thao', lastname: 'Le', title: 'CFO & Admin'},
        { username: 'hgkhanh', avatar: 'hgkhanh.png', firstname: 'Khanh', lastname: 'Hoang', title: 'Chairman'},
        { username: 'ltpthao', avatar: 'ltpthao.png', firstname: 'Thao', lastname: 'Le', title: 'CFO & Admin'},
        { username: 'hgkhanh', avatar: 'hgkhanh.png', firstname: 'Khanh', lastname: 'Hoang', title: 'Chairman'},
      ];
  }

  initChatRoom() {
    this.selectedChatRoomIndex = 0;
    this.selectedChatRoomId = this.chatData[0]['data']['r'];

    // Listen socket for new message
    this.chatService.messages.subscribe(msg => {
      console.log(msg);
      const receivedMsg = JSON.parse(msg.text);

      switch (receivedMsg.type) {
        case 'i': // invite other chatter into newRoom via addIntoRoom or chatWith

          if ((receivedMsg.id !== this.username) && (receivedMsg.i === this.username) && (!this.existedRoom(receivedMsg.r))) {
            // receivedMsg.members.includes(this.username)
            this.confirmationService.confirm({
              message: this.chatLanguage['chat_joining_question'],
              // `Will you join room to discuss with ${receivedMsg.id}?`,
              accept: () => {
                this.createNewRoom(receivedMsg.r, receivedMsg.members);

                this.comment = this.chatLanguage['chat_joining'];
                // `Hi there, ${this.username} entered the room.`;
                this.defineMessage('a');
              }
            });
          }
          this.addMessageToChatRoom(receivedMsg);
          break;

        case 'a': // invited chatter accept the invitation
          this.addMessageToChatRoom(receivedMsg);
          break;

        case 'm': // message
          this.addMessageToChatRoom(receivedMsg);
          break;

        case 'l': // chatter leave the room
          this.addMessageToChatRoom(receivedMsg);
          break;

        case 'q': // chatter disconnect socket
          this.addMessageToChatRoom(receivedMsg);
          break;

        default:
          break;
      }
    });

  }

  addMessageToChatRoom(receivedMsg) {
    /* Scan to match with message into room. Ignore the first 'About' */
    for (let i = 1; i < this.chatData.length; i++) {
      if (this.chatData[i]['data']['r'] === receivedMsg.r) {
        let img = receivedMsg.img;
        const count = this.chatData[i]['messages'].length;
        if ( count > 0) {
          if (this.chatData[i]['messages'][count - 1]['id'] === receivedMsg.id) {
            img = '';
          }
        }

        // Add message into room
        this.chatData[i]['messages'].push({
          id: receivedMsg.id,
          img: img,
          text: receivedMsg.text,
          date: receivedMsg.date
        });

        console.log(this.chatData);
        break;
      }
    }
  }

  ngAfterViewChecked() { // For Tab change?
    this.changeDetectorRef.detectChanges();
  }

  onTabChange(event) {
    this.selectedChatRoomIndex = event.index;
    this.selectedChatRoomId = this.chatData[event.index]['data']['r'];
  }

  onTabClose(event) {
    this.confirmationService.confirm({
      message: this.chatLanguage['chat_leaving_question'],
      // 'Are you sure to leave the room?',
      accept: () => {
        const index = event.index;
        this.comment = this.chatLanguage['chat_leaving'];
        // `${this.username} left the room.`;
        this.defineMessage('l');
        this.selectedChatRoomIndex = 0;
        this.selectedChatRoomId = this.chatData[this.selectedChatRoomIndex];
        this.chatData.splice(index, 1);
        event.close();
      }
    });
  }

  existedRoom(r): boolean {
    for (let i = 0; i < this.chatData.length; i++) {
      if (this.chatData[i]['data']['r'] === r) {
        return true;
      }
    }
    return false;
  }

  sendMessage(msg) {
    this.chatService.sendMsg(msg);
    console.log(msg);
  }

  addIntoRoom(id) {
    this.invitedUser = id;

    console.log(id);
    console.log(this.selectedChatRoomIndex);

    if (this.selectedChatRoomIndex !== 0) {
      if (!this.chatData[this.selectedChatRoomIndex]['data']['members'].includes(id)) {
        this.chatData[this.selectedChatRoomIndex]['data']['members'].push(id);

        // Send invite-message to invited chatter
        // this.comment = `${this.user.username} is inviting ${id} join discussion!`;
        // this.defineMessage('i');
        this.sendInvitation(id);
      } else {
        // console.log('Chatter is already in room!');
        // Send re-invite-message to invited chatter
        // this.comment = `${this.user.username} is inviting ${id} join discussion!`;
        // this.defineMessage('i');
        this.sendInvitation(id);
      }
    } else {
      this.chatWith(id);
    }
    // console.log(this.chatData);
  }

  sendInvitation(id) {
    this.translateService.get('chat_inviting', {value1: this.username, value2: id})
      .subscribe((res) => {
        this.comment = res;
        this.defineMessage('i');
      });
  }

  chatWith(id) {
    this.invitedUser = id;

    console.log(id);
    if (this.username !== id) {
      // Register a new room
      this.chatService.registerRoom()
        .subscribe(room => {
          // console.log(room);
          // Create new room
          const members = [this.username, id];
          this.createNewRoom(room.data, members);

          // Send invite-message to invited chatter
          // this.comment = `${this.user.username} is inviting ${id} join discussion!`;
          // this.defineMessage('i');
          this.sendInvitation(id);
        });
    }
  }

  createNewRoom(r, members) {
    const newRoom = {
      data: {
        'r': r,
        'members': members
      },
      messages: []
    };
    this.chatData.push(newRoom);
    this.selectedChatRoomIndex = this.chatData.length - 1;
    this.selectedChatRoomId = r;
    // console.log(this.selectedChatRoomIndex);
    // console.log(this.selectedChatRoomId);
  }

  public keyDownFunction(event) {
    if ((event.keyCode === 13) && (this.comment)) {
      this.defineMessage();
    }
  }

  defineMessage(type: string = 'm') {
    const msg = {
      id: this.username,            // s: Sender
      i: this.invitedUser,          // i: Invited
      r: this.selectedChatRoomId,   // r: Room
      img: this.userAvatar,         // a: Avatar
      // members: this.chatData[this.selectedChatRoomIndex]['data']['members'],
      type: type,                   // t: Type
      text: this.comment,           // c: Comment
      d: new Date()              // d: DateTime
    };
    this.sendMessage(msg);
    this.comment = '';
    this.invitedUser = '';
  }

  public searchContact(event) {
    if ((event.keyCode === 13) && (this.contact.length > 0)) {
      alert(this.contact);
    }
  }

  getAvatar(img) {
    const url = `${this.appConfig.apiUrl}/repo/${this.token}/users/${img}`;
    return url;
  }
  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    // this.globalState.subscribe('language', (lang) => {
    //   console.log(lang);
    //   this.translateService.use(lang);
    //   this.updateLanguageChange();
    // });

    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translateService.use(lang);
      this.updateLanguageChange();
    });
  }

  unsubscribeGlobalState() {
    this.defineMessage('q');

    // this.globalState.unsubscribe('language');
    this.globalState.unsubscribeEvent('language', this.myScope);

    if (this.chatService) {
      this.chatService.unsubscribe();
    }
  }

}
