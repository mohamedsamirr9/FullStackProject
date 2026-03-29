import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS2 } from '../../../../core/constants/api_urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  private baseUrl = API_URLS2.getProducts; // => http://localhost:5069/api/Product

  constructor(private httpClient: HttpClient) {}

  /** GET /api/Product/all — returns all products */
  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/all`);
  }

  /** GET /api/Product/{id} — returns product with category info */
  getById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  /** POST /api/Product — create product (FormData with image file) */
  create(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, formData);
  }

  /** PUT /api/Product/{id} — update product (FormData with optional image file) */
  update(id: number, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, formData);
  }

  /** DELETE /api/Product/{id} — delete product */
  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
