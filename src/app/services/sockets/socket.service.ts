import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../../constants';
// import  * as socketIo from 'socket.io-client';
import { Message } from '../../models/message';
import { ChatEvent } from '../../models/event';
import { Subject } from 'rxjs/Subject';
import { ChatRoom } from '../../models/chatRoom';

const socketIo = require('socket.io-client');


@Injectable()
export class SocketService {
  private socket;
  private rooms: ChatRoom[];

  get Rooms() {
    return  [{
      id: 'askdfh'
    }, {
      id: 'khdfss'
    }]//this.rooms;
  }

  initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  send(message: Message): void {
    this.socket.emit('message', message);
  }

  disconnect(): void {
    this.socket.emit('disconnected');
  }

  onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  onEvent(event: ChatEvent): Observable<any> {
    return new Observable<ChatEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  joinRoom(data) {
    this.socket.emit("room", data);
  }

  removeListener(event: ChatEvent): void {
    if (this.socket) {
      this.socket.removeListener(event);
    }
  }

}
