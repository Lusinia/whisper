import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  auth: any;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.auth = this.injector.get(AuthService);
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const changedReq = request.clone(
      {
        headers: request.headers
          .set('Authorization', `Bearer ${this.auth.getToken()}`)
          // .set('Content-Type', `application/json`)
      });

    return next.handle(changedReq)
      .map((event: HttpEvent<any>) => {
        console.log('event', event);
        if (event instanceof HttpResponse) {
          return event.clone({
            body: event.body,
          });
        }
      })
      .catch((error, caught) => {
        const parsedError = Object.assign({}, error, {error:error.error});
        return Observable.throw(new HttpErrorResponse(parsedError));
      }) as any;
  }
}
