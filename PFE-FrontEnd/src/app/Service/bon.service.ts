import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon } from '../Models/bon';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class BonService {

  baseUrl : string = 'http://localhost:3800/bons';



  constructor(private http: HttpClient) { }


  getbons(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBon(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  // createBon(bon: Object): Observable<Object> {
  //   return this.http.post(this.baseUrl, bon);
  // }

  createBon(bon:Bon):Observable<Bon>{
    return this.http.post<Bon>(this.baseUrl,bon);
  }

  // updateBon(o :Bon):Observable<Bon>{
  //   const url = `${this.baseUrl}/${o.idBon}`
  //   return this.http.put<Bon>(url, o);
    
  // }

  updateBon(id: number, value:Bon): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteBon(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getBonList(): Observable<Bon[]> {
    return this.http.get<Bon[]>(this.baseUrl);
   
  }
}
