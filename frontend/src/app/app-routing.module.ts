import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { OpProductosComponent } from './componentes/op-productos/op-productos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { VentasComponent } from "./componentes/ventas/ventas.component";
import { CrearVentaComponent } from "./componentes/ventas/crear-venta/crear-venta.component";
import { DetalleVentaComponent } from './componentes/ventas/detalle-venta/detalle-venta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/operaciones', component: OpProductosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventas/registrar', component: CrearVentaComponent},
  {path: 'ventas/:id', component: DetalleVentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }