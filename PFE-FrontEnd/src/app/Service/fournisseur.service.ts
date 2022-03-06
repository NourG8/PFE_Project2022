import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../Models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  baseUrl : string = 'http://localhost:3800/fournisseurs';

  constructor(private http: HttpClient) { }


  getbons(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBon(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  createBon(f:Fournisseur):Observable<Fournisseur>{
    return this.http.post<Fournisseur>(this.baseUrl,f);
  }

  updateBon(id: number, value:Fournisseur): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteBon(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getBonList(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.baseUrl);
   
  }
}
