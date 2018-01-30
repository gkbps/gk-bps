import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Internal
import { HChatModule } from '../../../nga/components/hChat';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    HChatModule,

    ChatRoutingModule,
  ],
  declarations: [ ChatComponent ],
  providers: [
  ],
})
export class ChatModule { }
