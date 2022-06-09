import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lait } from '../Models/lait';

@Injectable({
  providedIn: 'root',
})
export class LaitService {
  baseUrl: string = 'http://localhost:3800/laits';
  baseUrl2: string = 'http://localhost:3800/laitsFiltres';

  constructor(private http: HttpClient) {}

  getLaits(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getLaitsFiltres(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }

  getLait(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  createLait(lait: Lait): Observable<Lait> {
    return this.http.post<Lait>(this.baseUrl, Lait);
  }

  updateLait(id: number, value: Lait): Observable<Object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value);
  }

  deleteLait(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  getLaitList(): Observable<Lait[]> {
    return this.http.get<Lait[]>(this.baseUrl);
  }
}
