import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { SERVER_URL } from "../../constants";

@Injectable()
export class AuthService {

  private userDetails = null;

  constructor(private http: Http,
             private router: Router) {
    }

  logInAuthGoogle(): Observable<any> {
    return this.http.get(`${SERVER_URL}/auth/google`)
      .map((res: Response) => {
        console.log('res.json()', res.json());
        return res.json();
      })
  }

  checkLoggedIn(): Observable<Response> {
    return this.http.get(`${SERVER_URL}/api/current_user`)
      .map((res: Response) => res.json())
  }
  isLoggedIn() { //checkLoggedIn
    return this.userDetails !== null;
  }
  logOut() {
    return this.http.get(`${SERVER_URL}/api/logout`)
      .map((res: Response) => res.json())
  }
}
