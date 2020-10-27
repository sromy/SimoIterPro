import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Order } from '../models/order';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/simoiterpro-api/api/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder (userId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Order>(apiUrl, order, {headers, params});
  }

  getOrdersByUser(userId: string,minTotal?:number, maxTotal?:number, startDate?:Date, endDate?:Date): Observable<Order[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Order[]>(apiUrl, {headers, params});
  }
}
