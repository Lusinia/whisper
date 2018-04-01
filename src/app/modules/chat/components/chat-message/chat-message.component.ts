import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../../../../services/sockets/socket.service';
import { AuthService } from '../../../../services/authService/auth.service';
import { UserParams } from '../../../../models/user';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @ViewChild('message') private message: ElementRef;
  createMessageForm: FormGroup;
  loading: false;
  user:UserParams;

  constructor(private socketService: SocketService,
              authService: AuthService) {
    authService.user.subscribe(res => {
      console.log('res',res);
      // this.user = res
    });
  }

  get formValid() {
    return this.createMessageForm.valid;
  }

  ngOnInit() {
    this.createMessageForm = new FormGroup({
      'message': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  public createMessage(): void {
    const message = this.createMessageForm.value.message;
    if (!message || !this.createMessageForm.valid) {
      return;
    }

    this.socketService.send({
      from: 'hghbnkm',//this.user.id,
      content: message
    });
    this.message.nativeElement.value = null;
  }

}
