import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vache } from '../Models/vache';

@Injectable({
  providedIn: 'root'
})
export class VacheService {

  baseUrl : string = 'http://localhost:3800/vaches';



  constructor(private http: HttpClient) { }


  getVaches(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getVache(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }


  createVache(vache:Vache):Observable<Vache>{
    return this.http.post<Vache>(this.baseUrl,vache);
  }

  updateVache(id: number, value:Vache): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteVache(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getVacheList(): Observable<Vache[]> {
    return this.http.get<Vache[]>(this.baseUrl);
   
  }
}
