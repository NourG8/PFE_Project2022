import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vache } from '../Models/vache';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class VacheService {
  baseUrl: string = 'http://localhost:3800/vaches';
  baseUrl6: string = 'http://localhost:3800/nbreV';
  baseUrl7: string = 'http://localhost:3800/vache';
  baseUrl8: string = 'http://localhost:3800/bonne';
  baseUrl9: string = 'http://localhost:3800/malade';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNbVaches(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl6}`, { headers: httpHeaders });
  }

  getVaches(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  getVache(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getVacheMatricule(matricule: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl7}/${matricule}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createVache(vache: Vache): Observable<Vache> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Vache>(this.baseUrl, vache, { headers: httpHeaders });
  }

  updateVache(id: number, value: Vache): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  bonneVache(value: Vache): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl8}/${value.idVache}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  maladeVache(value: Vache): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl9}/${value.idVache}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteVache(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getVacheList(): Observable<Vache[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Vache[]>(this.baseUrl, { headers: httpHeaders });
  }
}
