import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/authService/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'username': new FormControl(null, [ Validators.minLength(2), Validators.required ]),
      'password': new FormControl(null, [  Validators.minLength(2), Validators.required  ]),
    });
  }
  authUser() {
    console.log('username', this.loginForm.value.username);
    console.log('password', this.loginForm.value.password);
      // this.submitChangeProfile(params);
  }

}
