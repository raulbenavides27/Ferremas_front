import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from './services/producto/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ferremas_front';
  productoForm!: FormGroup;
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required]
    });

    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      resp => {
        this.productos = resp;
        console.log(resp);
      },
      error => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.productoService.saveProductos(this.productoForm.value).subscribe(
      resp => {
        this.productoForm.reset();
        this.loadProductos(); // Recargar la lista de productos
      },
      error => {
        console.error(error);
      }
    );
  }
}
