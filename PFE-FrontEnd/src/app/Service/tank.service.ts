import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tank } from '../Models/tank';

@Injectable({
  providedIn: 'root'
})
export class TankService {
  baseUrl : string = 'http://localhost:3800/tanks';
  baseUrl2 : string = 'http://localhost:3800/tanksFilres';
 

  constructor(private http: HttpClient) { }


  getTanks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTanksFiltres(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }

  getTank(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  createTank(f:Tank):Observable<Tank>{
    return this.http.post<Tank>(this.baseUrl,f);
  }

  updateTank(id: number, value:Tank): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteTank(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getTankList(): Observable<Tank[]> {
    return this.http.get<Tank[]>(this.baseUrl);
   
  }
}
