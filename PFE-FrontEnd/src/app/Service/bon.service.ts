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

  createBon(bon:any){
    return this.http.post(this.baseUrl,bon);
  }

  updateBon(id: number, value:any){
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
