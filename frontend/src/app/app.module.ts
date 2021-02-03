import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from "swiper/angular";

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { OpProductosComponent } from './componentes/op-productos/op-productos.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { CrearVentaComponent } from './componentes/ventas/crear-venta/crear-venta.component';
import { DetalleVentaComponent } from './componentes/ventas/detalle-venta/detalle-venta.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    FiltroPipe,
    InicioComponent,
    ProductosComponent,
    OpProductosComponent,
    SidebarComponent,
    ClientesComponent,
    LoginComponent,
    VentasComponent,
    CrearVentaComponent,
    DetalleVentaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
