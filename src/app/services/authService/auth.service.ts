import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from "../../constants";
import { Subject } from 'rxjs/Subject';
import { UserParams } from '../../models/user';
import { AuthParams } from '../../models/authParams';

@Injectable()
export class AuthService {

  user: Subject<UserParams> = new Subject();
  private userDetails = null;

  constructor(private http: HttpClient) {
    this.user.next({id: '213123sdfsdf'})
  }

  logInAuthGoogle(): Observable<any> {
    const url = `${SERVER_URL}/auth/google`;
    return this.http.get(url)
      .map((res: HttpResponse<any>) => {
        return res.body
      })
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // logInAuthBarear(): Observable<any> {
  //   return this.http.get(`${SERVER_URL}/profile`)
  //     .map((res: Response) => {
  //         return res.json();
  //     })
  // }
  loginToken(params: AuthParams) {
    const url = `${SERVER_URL}/auth/token`;
    return this.http.post(url, params)
      .map((res: HttpResponse<any>) => {
        return res['token']
      })
  }

  logIn(): Observable<any> {
    return this.http.get(`${SERVER_URL}/auth/login`)
  }

  registerUser(params: AuthParams) {
    return this.http.post(`${SERVER_URL}/auth/register`, params)
      .map((res: HttpResponse<any>) => {
        return res['token']
      })
  }

  // deleteUserAvatar()
  updateUser(params) {
    const headers = new HttpHeaders();
    headers.delete("Content-Type");
    headers.set("Content-Type", "multipart/form-data");
    console.log('headers', headers);
    return this.http.post(`${SERVER_URL}/auth/upload`, params, {headers})
  }

  getUserToken() {
    return this.http.get(`${SERVER_URL}/auth/token`)
      .map((res: Response) => {
        return res.json();
      })
  }

  checkLoggedIn(): Observable<Response> {
    return this.http.get(`${SERVER_URL}/auth/current_user`)
      .map((res: HttpResponse<any>) => {
        return res.body
      })
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }


  logOut() {
    localStorage.removeItem('token');
  }
}
