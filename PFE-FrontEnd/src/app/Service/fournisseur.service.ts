import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../Models/fournisseur';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  baseUrl6 : string = 'http://localhost:3800/nbreF';
  baseUrl : string = 'http://localhost:3800/fournisseurs';
  baseUrl7 : string = 'http://localhost:3800/fournis';
  baseUrl8 : string = 'http://localhost:3800/fournis1';

  

  constructor(private http: HttpClient,private authService :AuthService) { }

  getNbFournisseurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
  }


  getFournisseurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
  }

  getFournisseur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
  }


  getFournisseurNom(nom: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl8}/${nom}`
    return this.http.get(url,{headers:httpHeaders});
  }


  getFournisseurMatricule(matricule: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl7}/${matricule}`
    return this.http.get(url,{headers:httpHeaders});
  }



  createFournisseur(f:Fournisseur):Observable<Fournisseur>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Fournisseur>(this.baseUrl,f,{headers:httpHeaders});
  }

  updateFournisseur(id: number, value:Fournisseur): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
  }

  

  deleteFournisseur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
 
  }

  getFournisseurList(): Observable<Fournisseur[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Fournisseur[]>(this.baseUrl,{headers:httpHeaders});
   
  }
}
