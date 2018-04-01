import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat-page/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ChatComponent, ChatRoomComponent, ChatMessageComponent],
  exports: [ChatComponent]
})
export class ChatModule { }
