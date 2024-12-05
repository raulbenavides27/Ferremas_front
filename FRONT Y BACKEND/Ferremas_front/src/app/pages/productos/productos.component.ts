import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  title = 'Ferremas_front';
  productoForm!: FormGroup;
  productos: any[] = [];
  hoy: string;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) { 
    this.hoy = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      fecha: [this.hoy, Validators.required],
      codigo: [''],
      descripcion: [''],
      categoria: ['', Validators.required],
      unidadDeMedida: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      marca: ['', Validators.required],
      tipo: ['', Validators.required],
      vendible: [false],
      estado: ['', Validators.required],
      ean13: ['', Validators.required],
      volumen: ['', [Validators.required, Validators.min(0)]],
      afectoOExento: ['', Validators.required],
      imagen: ['']
    });

    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      resp => {
        this.productos = resp.map((producto: any) => ({
          id: producto.id,
          name: producto.name,
          fecha: producto.fecha,
          codigo: producto.codigo,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          unidadDeMedida: producto.unidadDeMedida,
          peso: producto.peso,
          marca: producto.marca,
          tipo: producto.tipo,
          vendible: producto.vendible,
          estado: producto.estado,
          ean13: producto.ean13,
          volumen: producto.volumen,
          afectoOExento: producto.afectoOExento,
          imagen: producto.imagen
        }));
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
      fecha: producto.fecha,
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      unidadDeMedida: producto.unidadDeMedida,
      peso: producto.peso,
      marca: producto.marca,
      tipo: producto.tipo,
      vendible: producto.vendible,
      estado: producto.estado,
      ean13: producto.ean13,
      volumen: producto.volumen,
      afectoOExento: producto.afectoOExento,
      imagen: producto.imagen
    });
  }

  limpiarFormulario(): void {
    this.productoForm.reset({
      id: null,
      fecha: this.hoy,
      vendible: false
    });
  }
}
