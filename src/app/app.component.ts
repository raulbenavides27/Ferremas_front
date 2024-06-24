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
      id:[''],
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
    if (this.productoForm.valid) {
      if (this.productoForm.value.id) {
        // Update existing product
        this.productoService.updateProducto(this.productoForm.value).subscribe(
          resp => {
            this.productoForm.reset();
            this.loadProductos(); // Recargar la lista de productos
          },
          error => {
            console.error('Error al actualizar el producto:', error);
            // Aquí podrías mostrar un mensaje al usuario o realizar alguna acción específica en caso de error
          }
        );
      } else {
        // Save new product
        this.productoService.saveProductos(this.productoForm.value).subscribe(
          resp => {
            this.productoForm.reset();
            this.loadProductos(); // Recargar la lista de productos
          },
          error => {
            console.error('Error al guardar el nuevo producto:', error);
            // Aquí podrías mostrar un mensaje al usuario o realizar alguna acción específica en caso de error
          }
        );
      }
    } else {
      console.error('Formulario inválido');
      // Aquí podrías mostrar un mensaje al usuario o realizar alguna acción específica si el formulario no es válido
    }
  }
  

  eliminar(producto: any): void {
    this.productoService.deleteProductos(producto.id).subscribe(
      resp => {
        console.log(resp);
        if (resp) {  // Si resp es true, eliminamos el producto de la lista
          this.productos = this.productos.filter(p => p.id !== producto.id);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  editar(producto: any): void {
    this.productoForm.setValue({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      fecha: producto.fecha
    });
  }
  limpiarFormulario(): void {
    this.productoForm.reset();  // Esto limpia todos los campos del formulario
  }
  
}
