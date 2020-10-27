import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Order } from '../models/order';
import { Filter } from '../models/filter';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/simoiterpro-api/api/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, 
              private datePipe: DatePipe) { }

  createOrder (userId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Order>(apiUrl, order, {headers, params});
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Order[]>(apiUrl, {headers, params});
  }

  getOrdersByFilters(filters: Filter): Observable<Order[]> {    
    let params = new HttpParams().set('userId', filters.userId);
    if (filters.startDate)
      params = params.append('startDate',this.datePipe.transform(filters.startDate, 'yyyy-MM-dd'))
    if (filters.endDate)
      params = params.append('endDate',this.datePipe.transform(filters.endDate, 'yyyy-MM-dd'))
    if (filters.minTotal != null)
      params = params.append('minTotal',filters.minTotal+"")  
    if (filters.maxTotal != null)
      params = params.append('maxTotal',filters.maxTotal+"")    
    
    return this.http.get<Order[]>(apiUrl, {headers, params});
  }

}
