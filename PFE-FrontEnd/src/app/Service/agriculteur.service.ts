import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agriculteur } from '../Models/agriculteur';

@Injectable({
  providedIn: 'root'
})
export class AgriculteurService {
  baseUrl : string = 'http://localhost:3800/agriculteurs';



  constructor(private http: HttpClient) { }


  getagriculteurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getagriculteur(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }


  createagriculteur(agriculteur:any){
    return this.http.post(this.baseUrl,agriculteur);
  }


  updateagriculteur(id: number, value:Agriculteur): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteagriculteur(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getagriculteurList(): Observable<Agriculteur[]> {
    return this.http.get<Agriculteur[]>(this.baseUrl);
   
  }
}
