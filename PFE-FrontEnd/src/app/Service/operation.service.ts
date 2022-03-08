import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  baseUrl : string = 'http://localhost:3800/operations';

  constructor(private http: HttpClient) { }



  getOperations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOperation(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  createOperation(f:any){
    return this.http.post(this.baseUrl,f);
  }

  updateOperation(id: number, value:any) {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteOperation(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getOperationList(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.baseUrl);
   
  }
}
