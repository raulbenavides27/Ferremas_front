import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getProductos(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + '/Product');
  }

  public saveProductos(producto: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + '/Product', producto);
  }

  updateProducto(producto: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER + '/Product/' + producto.id, producto);
  }

  public deleteProductos(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API_SERVER + '/Product/' + id);
  }
}
