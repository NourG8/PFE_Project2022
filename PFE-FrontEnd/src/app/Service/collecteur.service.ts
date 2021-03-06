import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collecteur } from '../Models/collecteur';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CollecteurService {
  baseUrl: string = 'http://localhost:3800/collecteurs';
  baseUrl1: string = 'http://localhost:3800/nbreCollecteur';
  baseUrl7: string = 'http://localhost:3800/coll';
  baseUrl8: string = 'http://localhost:3800/coll1';
  baseUrl9: string = 'http://localhost:3800/collec';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCollecteurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  getCollecteurNomCollecteur(nomCollecteur: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl8}/${nomCollecteur}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getCollecteurTel(tel: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl7}/${tel}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getCollecteurMatricule(matricule: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl9}/${matricule}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbCollecteurs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl1}`, { headers: httpHeaders });
  }

  getCollecteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createCollecteur(collecteur: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl, collecteur, { headers: httpHeaders });
  }

  updateCollecteur(id: number, value: any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteCollecteur(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getCollecteurList(): Observable<Collecteur[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Collecteur[]>(this.baseUrl, { headers: httpHeaders });
  }
}
