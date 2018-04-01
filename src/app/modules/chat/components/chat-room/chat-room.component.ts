import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../../models/message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  @Input() messages: Message[];
  isMyMessage: boolean;
  constructor() {
    this.isMyMessage = true;
  }

  ngOnInit() {

  }

}
