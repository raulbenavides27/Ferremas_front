import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DespachosService {
  private API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getDespachos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_SERVER}/despachos`);
  }

  public saveDespacho(despacho: any): Observable<any> {
    return this.httpClient.post(`${this.API_SERVER}/despachos`, despacho);
  }

  public updateDespacho(despacho: any): Observable<any> {
    return this.httpClient.put(`${this.API_SERVER}/despachos/${despacho.id}`, despacho);
  }

  public deleteDespacho(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API_SERVER}/despachos/${id}`);
  }
}
