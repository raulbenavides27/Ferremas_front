import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isConnectedToServer: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.checkServerConnection();
  }

  checkServerConnection() {
    const apiUrl = "http://localhost:8080/api/v1/Product";

    this.http.get(apiUrl).subscribe(
      () => {
        console.log('Conexión establecida correctamente');
        this.isConnectedToServer = true;
      },
      (error: HttpErrorResponse) => {
        console.error('Error al verificar la conexión:', error);
        this.isConnectedToServer = false;
      }
    );
  }
}
