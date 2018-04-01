import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { SERVER_URL } from '../../constants';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductsService {
  private socket;

  constructor(private http: HttpClient){ }

   getProducts(): Observable<any> {
     return this.http.get(`${SERVER_URL}/products`)
       .map((res: Response) => {
         console.log('res.json()', res.json());
         return res.json();
       })
  }
}
