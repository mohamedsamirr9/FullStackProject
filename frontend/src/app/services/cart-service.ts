import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS2 } from '../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  getCartItems(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any>(API_URLS2.getCartItems, { headers });
  }
  addToCart(quantity: number, productId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<any>(API_URLS2.addToCart, { quantity, productId }, { headers });
  }
  updateCartItem(quantity: number, productId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put<any>(
      `${API_URLS2.updateCartItem}`,
      { quantity, productId },
      { headers },
    );
  }
  removeCartItem(productId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete<any>(`${API_URLS2.deleteCartItem}/${productId}`, { headers });
  }
}
