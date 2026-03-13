import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS, API_URLS2 } from '../constants/api_urls';
import { Iproductresponse } from '../models/iproductresponse';
import { Iproductfake } from '../models/iproductfake';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<any> {
    return this.httpClient.get<any>(API_URLS2.getProducts);
  }

  getProduct(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URLS2.getProduct}/${id}`);
  }
  searchProducts(query: string): Observable<Iproductresponse> {
    return this.httpClient.get<Iproductresponse>(`${API_URLS.searchProducts}?q=${query}`);
  }
  addProduct(product: any): Observable<any> {
    return this.httpClient.post<any>(API_URLS.addProduct, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URLS.deleteProduct}/${id}`);
  }
}
