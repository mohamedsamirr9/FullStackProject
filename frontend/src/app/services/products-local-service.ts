import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS2 } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsLocalService {
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<any> {
    return this.httpClient.get<any>(API_URLS2.getProducts);
  }
  getProductsByCategory(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URLS2.getProductsByCategory}/${id}`);
  }
  getProductsByPage(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URLS2.getProducts}/${page}/${pageSize}`);
  }
  getProductsByCategoryByPage(id: number, page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URLS2.getProductsByCategory}/${id}/${page}/${pageSize}`);
  }
}
