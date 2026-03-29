import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS2 } from '../../../core/constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getCategories(): Observable<any> {
    return this.httpClient.get<any>(API_URLS2.getCategories);
  }
}
