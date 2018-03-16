import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent],
  exports: [ChatComponent]
})
export class ChatModule { }
