import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/authService/auth.service';
import { CLOUD_NAME } from 'app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  @ViewChild('fileInput') fileInput;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [ Validators.minLength(2), Validators.required ]),
      'password': new FormControl(null, [  Validators.minLength(2), Validators.required  ]),
      'username': new FormControl(null, [  Validators.minLength(2), Validators.required  ]),
    });
  }

  signUpUser() {
    const params = {
      "email": this.signUpForm.value.email,
      "password": this.signUpForm.value.password,
      "username": this.signUpForm.value.username,
    };
    this.authService.registerUser(params).subscribe(res => {
      this.authService.setToken(res.toString());
    })
  }
  upload(event: any) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    // let file = event.target.files;
    // let fData: FormData = new FormData;

    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      // formData.append("image", fileBrowser.files[0]);
      formData.append("image", fileBrowser.files[0], 'chris.jpg');

      // formData.append('id', model.id);
      // formData.append('applicationName', model.applicationName);
      console.log('formData', formData, fileBrowser.files[0]);
      this.authService.updateUser(formData).subscribe(res => {
        this.authService.user.next(res['user']);
        this.router.navigate(['/landing']);      })
    }
  }

}

