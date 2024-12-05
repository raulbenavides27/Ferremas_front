import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { DespachosComponent } from './pages/despachos/despachos.component';

const routes: Routes = [
  { path: 'ventas', component: VentasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'despachos', component: DespachosComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }, // Redirigir al componente de ventas por defecto
  { path: '**', redirectTo: '/productos' } // Redirigir a ventas si la ruta no es reconocida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
