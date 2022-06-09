import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  baseUrl: string = 'http://localhost:3800/operations';
  baseUrl1: string = 'http://localhost:3800/retrait';
  baseUrl2: string = 'http://localhost:3800/remplissage';
  baseUrl3: string = 'http://localhost:3800/operationsRetrait';
  baseUrl4: string = 'http://localhost:3800/operationsRemplissages';
  baseUrl5: string = 'http://localhost:3800/operationsTank';
  baseUrl6: string = 'http://localhost:3800/nbreOp';
  baseUrl7: string = 'http://localhost:3800/operationsR';
  baseUrl8: string = 'http://localhost:3800/opTank';
  baseUrl9: string = 'http://localhost:3800/NbOpTankTotal';
  baseUrl10: string = 'http://localhost:3800/NbOpTank1';
  baseUrl11: string = 'http://localhost:3800/NbOpTankRetrait';

  baseUrl14: string = 'http://localhost:3800/nbOpRetrait';
  baseUrl15: string = 'http://localhost:3800/nbOpRemplissage';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl8}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbOpRetrait(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl14}`, { headers: httpHeaders });
  }

  getNbOpRemplissage(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl15}`, { headers: httpHeaders });
  }

  getNbOpTankTotal(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl9}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl10}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbOpTankRetrait(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl11}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getNbOp(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl6}`, { headers: httpHeaders });
  }

  getOperations(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl}`, { headers: httpHeaders });
  }

  getOperationsRemplissages(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl4}`, { headers: httpHeaders });
  }

  getOperationsRetraits(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl3}`, { headers: httpHeaders });
  }

  getOperationsTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get(`${this.baseUrl5}`, { headers: httpHeaders });
  }

  getOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  getOperationTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl5}/${id}`;
    return this.http.get(url, { headers: httpHeaders });
  }

  createOperation(f: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl1, f, { headers: httpHeaders });
  }

  createOperationRemplissage(f: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post(this.baseUrl2, f, { headers: httpHeaders });
  }

  updateOperation(id: number, value: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  updateOperationR(id: number, value: any) {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.baseUrl7}/${id}`;
    return this.http.put(url, value, { headers: httpHeaders });
  }

  deleteOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  getOperationList(): Observable<Operation[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Operation[]>(this.baseUrl, { headers: httpHeaders });
  }
}
