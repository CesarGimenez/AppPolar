import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Productos } from "../../models/productos";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  constructor(public productosService: ProductosService) { }

  filterProducto = '';

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productosService.getProductos().subscribe(res =>{
      this.productosService.Producto = res as Productos[];
      console.log(res);
    })
  }

}