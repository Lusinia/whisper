import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SERVER_URL } from '../../constants';
const socketIo = require ('socket.io-client');
// import  * as socketIo from 'socket.io-client';
import { Message } from '../../modules/chat/models/message';
import { ChatEvent } from '../../modules/chat/models/event';


@Injectable()
export class SocketService {
  private socket;

   initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }
   send(message: Message): void {
    this.socket.emit('message', message);
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
   removeListener(event: ChatEvent): void {
   if (this.socket) {
     this.socket.removeListener(event);
   }
  }
}
