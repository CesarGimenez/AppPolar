import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Productos } from "../../models/productos";
import { EmpleadoService } from "../../services/empleado.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  public identidad;
  public token;

  constructor(public productosService: ProductosService, private empleadoService: EmpleadoService, private router:Router) { 
    this.identidad = empleadoService.getIdentidad();
    this.token = empleadoService.getToken();
   }

  filterProducto = '';

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    }
    this.getProductos();
  }

  getProductos(){
    this.productosService.getProductos().subscribe(res =>{
      this.productosService.Producto = res as Productos[];
      console.log(res);
    })
  }

}