import { Component, OnInit } from '@angular/core';
import { Action } from '../../models/action';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { ChatEvent } from '../../models/event';
import { SocketService } from '../../../../services/sockets/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(ChatEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(ChatEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }
  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }
  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user['name'],
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
