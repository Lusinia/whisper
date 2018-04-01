import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.minLength(2), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(2), Validators.required]),
    });
  }

  authUser() {
    const params = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log('params', params);
    this.authService.loginToken(params).subscribe(res => {
      if (res) {
        this.authService.setToken(res);
        this.authService.logIn().subscribe(response => {
          this.authService.user.next(response.user);
          // this.router.navigate(['/landing']);
        })
      }
    })
  }

}
