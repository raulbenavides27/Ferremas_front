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
      cantidad: ['', [Validators.required, Validators.min(1)]],
      totalNeto: [''],
      iva: [''],
      total: ['']
    });

    this.loadDespachos();
  }

  loadDespachos(): void {
    this.despachosService.getDespachos().subscribe(
      resp => {
        this.despachos = resp;
      },
      error => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    if (this.despachoForm.valid) {
      if (this.despachoForm.value.id) {
        this.despachosService.updateDespacho(this.despachoForm.value).subscribe(
          resp => {
            this.despachoForm.reset();
            this.loadDespachos();
          },
          error => {
            console.error('Error al actualizar el despacho:', error);
          }
        );
      } else {
        this.despachosService.saveDespacho(this.despachoForm.value).subscribe(
          resp => {
            this.despachoForm.reset();
            this.loadDespachos();
          },
          error => {
            console.error('Error al guardar el nuevo despacho:', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  eliminar(despacho: any): void {
    this.despachosService.deleteDespacho(despacho.id).subscribe(
      resp => {
        if (resp) {
          this.despachos = this.despachos.filter(d => d.id !== despacho.id);
        }
      },
      error => {
        console.error(error);
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
      cantidad: despacho.cantidad,
      totalNeto: despacho.totalNeto,
      iva: despacho.iva,
      total: despacho.total
    });
  }

  limpiarFormulario(): void {
    this.despachoForm.reset();
  }
}
