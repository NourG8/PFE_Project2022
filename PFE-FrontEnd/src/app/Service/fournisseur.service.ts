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


  getFournisseurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getFournisseur(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  createFournisseur(f:Fournisseur):Observable<Fournisseur>{
    return this.http.post<Fournisseur>(this.baseUrl,f);
  }

  updateFournisseur(id: number, value:Fournisseur): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteFournisseur(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getFournisseurList(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.baseUrl);
   
  }
}
