import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private API_SERVE = "http://localhost:8080/api/v1/Product";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProductos(): Observable<any> {
    return this.httpClient.get(this.API_SERVE);
  }
  public saveProductos(producto: any): Observable<any> {
    return this.httpClient.post(this.API_SERVE, producto);
  }
}
