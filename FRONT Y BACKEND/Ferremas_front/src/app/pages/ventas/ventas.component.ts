import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../services/ventas/ventas.service'; // Ajusta la ruta según la ubicación real del servicio de ventas

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventaForm!: FormGroup;
  ventas: any[] = []; // Array para almacenar las ventas

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService // Servicio para interactuar con las ventas
  ) { }

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      id: [''],
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      totalNeto: [''],
      iva: [''],
      total: [''],
      fecha: ['', Validators.required],

    });

    this.loadVentas(); // Cargar las ventas existentes al iniciar el componente
  }

  loadVentas(): void {
    this.ventasService.getVentas().subscribe(
      resp => {
        this.ventas = resp;
        console.log(resp);
      },
      error => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    if (this.ventaForm.valid) {
      if (this.ventaForm.value.id) {
        // Actualizar venta existente
        this.ventasService.updateVenta(this.ventaForm.value).subscribe(
          resp => {
            this.ventaForm.reset();
            this.loadVentas(); // Recargar la lista de ventas
          },
          error => {
            console.error('Error al actualizar la venta:', error);
          }
        );
      } else {
        // Guardar nueva venta
        this.ventasService.saveVenta(this.ventaForm.value).subscribe(
          resp => {
            this.ventaForm.reset();
            this.loadVentas(); // Recargar la lista de ventas
          },
          error => {
            console.error('Error al guardar la nueva venta:', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  eliminar(venta: any): void {
    this.ventasService.deleteVenta(venta.id).subscribe(
      resp => {
        console.log(resp);
        if (resp) {
          this.ventas = this.ventas.filter(v => v.id !== venta.id); // Eliminar la venta de la lista
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  editar(venta: any): void {
    this.ventaForm.setValue({
      id: venta.id,
      idCliente: venta.idCliente,
      idProducto: venta.idProducto,
      cantidad: venta.cantidad,
      totalNeto: venta.totalNeto,
      iva: venta.iva,
      total: venta.total,
      fecha: venta.fecha
    });
  }

  limpiarFormulario(): void {
    this.ventaForm.reset(); // Limpiar todos los campos del formulario
  }
}
