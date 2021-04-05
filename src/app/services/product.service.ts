import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseURL = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL);
  }

  get(id): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(this.baseURL, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(`${this.baseURL}?q=${name}`);
  }
}