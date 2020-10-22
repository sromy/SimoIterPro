import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Product } from '../models/product';
import { ResponseEntity } from '../models/responseentity';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/simoiterpro-api/api/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }

  getProducts(): Observable<Product[]> {   
    return this.http.get<Product[]>(apiUrl, {headers});
  }

  createProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, {headers});
  }

  updateProduct (id: Int32Array, product: Product): Observable<Product> {
    return this.http.put<Product>(`${apiUrl}/${id}`, product, {headers});
  }

  deleteProduct (id: Int32Array): Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${apiUrl}/${id}`, {headers});
  }

}
