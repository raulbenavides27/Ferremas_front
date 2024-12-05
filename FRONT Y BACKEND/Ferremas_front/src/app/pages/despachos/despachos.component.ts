import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DespachosService } from 'src/app/services/despacho/despacho.service';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  despachoForm!: FormGroup;
  despachos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private despachosService: DespachosService
  ) { }

  ngOnInit(): void {
    this.despachoForm = this.fb.group({
      id: [''],
      idCliente: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadDespachos();
  }

  loadDespachos(): void {
    this.despachosService.getDespachos().subscribe(
      resp => {
        this.despachos = resp;
        console.log(resp);
      },
      error => {
        console.error('Error al cargar los despachos:', error);
      }
    );
  }

  guardar(): void {
    if (this.despachoForm.valid) {
      if (this.despachoForm.value.id) {
        // Actualizar despacho existente
        this.despachosService.updateDespacho(this.despachoForm.value).subscribe(
          resp => {
            this.despachoForm.reset();
            this.loadDespachos(); // Recargar la lista de despachos
          },
          error => {
            console.error('Error al actualizar el despacho:', error);
          }
        );
      } else {
        // Save new product
        this.despachosService.saveDespacho(this.despachoForm.value).subscribe(
          resp => {
            this.despachoForm.reset();
            this.loadDespachos(); // Recargar la lista de productos
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


  eliminar(despacho: any): void {
    this.despachosService.deleteDespacho(despacho.id).subscribe(
      resp => {
        console.log(resp);
        if (resp) { // Si resp es true, eliminamos el despacho de la lista
          this.despachos = this.despachos.filter(d => d.id !== despacho.id);
        }
      },
      error => {
        console.error('Error al eliminar el despacho:', error);
      }
    );
  }

  editar(despacho: any): void {
    this.despachoForm.setValue({
      id: despacho.id,
      idCliente: despacho.idCliente,
      direccion: despacho.direccion,
      fechaEntrega: despacho.fechaEntrega,
      idProducto: despacho.idProducto,
      cantidad: despacho.cantidad
    });
  }

  limpiarFormulario(): void {
    this.despachoForm.reset();
  }
}
