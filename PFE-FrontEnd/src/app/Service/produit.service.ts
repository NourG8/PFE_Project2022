import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../Models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  baseUrl : string = 'http://localhost:3800/produits';

  constructor(private http: HttpClient) { }


  getProduits(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProduit(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url);
  }

  createProduit(f:Produit):Observable<Produit>{
    return this.http.post<Produit>(this.baseUrl,f);
  }

  updateProduit(id: number, value:Produit): Observable<Object> {
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value);
  }

  

  deleteProduit(id: number): Observable<any> {

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url);
 
  }

  getProduitList(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
   
  }
}
