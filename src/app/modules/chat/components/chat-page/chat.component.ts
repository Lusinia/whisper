import { Component, OnDestroy, OnInit } from '@angular/core';
import { Action } from '../../../../models/action';
import { UserParams } from '../../../../models/user';
import { Message } from '../../../../models/message';
import { ChatEvent } from '../../../../models/event';
import { SocketService } from '../../../../services/sockets/socket.service';
import { AuthService } from '../../../../services/authService/auth.service';
import { ChatRoom } from '../../../../models/chatRoom';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  action = Action;
  user: UserParams;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  rooms: ChatRoom[];

  constructor(private socketService: SocketService,
              private authService: AuthService) {
    this.rooms = [{
      id: 'kasuhdfls',
      userAvatar: 'https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg',
      name: 'Kyle'
    }]
   }

  ngOnInit(): void {
    this.initIoConnection();
    // this.authService.user.subscribe(res => this.user = res )
  }

  ngOnDestroy () {
    this.socketService.disconnect();
    this.ioConnection.unsubscribe();
    console.log('unsubscribe');
    // this.socketService.removeListener()
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    this.socketService.Rooms.forEach((room, index) => {
      if (index === 0) {
        console.log('join room', room);
        this.socketService.joinRoom(room.id);
      }
    });
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        console.log('this.messages', this.messages);
      });

    this.socketService.onEvent(ChatEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(ChatEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
    this.socketService.onEvent(ChatEvent.MESSAGE)
      .subscribe((res) => {
        console.log('MESSAGE', res);
      });
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user.id,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.login,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}

/*
// set-up a connection between the client and the server
var socket = io.connect();

// let's assume that the client page, once rendered, knows what room it wants to join
var room = "abc123";

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});
 */
