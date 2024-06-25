import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getVentas(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_SERVER + '/ventas');
  }

  public saveVenta(venta: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + '/ventas', venta);
  }

  public updateVenta(venta: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER + '/ventas/' + venta.id, venta);
  }

  public deleteVenta(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API_SERVER + '/ventas/' + id);
  }
}
