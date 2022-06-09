import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tank } from '../Models/tank';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TankService {
  baseUrl: string = 'http://localhost:3800/tanks';
  baseUrl2: string = 'http://localhost:3800/tanksFilres';
  baseUrl3: string = 'http://localhost:3800/qteTanksLibre';
  baseUrl4: string = 'http://localhost:3800/qteTanksGenerale';
  baseUrl6: string = 'http://localhost:3800/nbreT';
  baseUrl7: string = 'http://localhost:3800/tank';

  baseUrl11: string = 'http://localhost:3800/nbTankRemplis';
  baseUrl12: string = 'http://localhost:3800/nbTankVide';
  baseUrl13: string = 'http://localhost:3800/nbTankEnCours';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNbTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl6}`, { headers: httpHeaders });
  }

  getTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  getNbTanksRemplis(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl11}`, { headers: httpHeaders });
  }

  getNbTanksVide(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl12}`, { headers: httpHeaders });
  }

  getNbTanksEnCours(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl13}`, { headers: httpHeaders });
  }

  getTanksQteLibre(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl3}`, { headers: httpHeaders });
  }

  getTanksQteGenerale(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl4}`, { headers: httpHeaders });
  }

  getTanksFiltres(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl2}`, { headers: httpHeaders });
  }

  getTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  // test si le matricule du tank exist ou nn
  getTankUtilise(matricule: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl7}/${matricule}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createTank(f: Tank): Observable<Tank> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Tank>(this.baseUrl, f, { headers: httpHeaders });
  }

  updateTank(id: number, value: Tank): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getTankList(): Observable<Tank[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Tank[]>(this.baseUrl, { headers: httpHeaders });
  }
}
