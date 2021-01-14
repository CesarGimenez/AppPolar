import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../models/productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  selectedProducto: Productos;
  Producto: Productos[];
  constructor(private http: HttpClient) { 
    this.selectedProducto = new Productos();
   }

  getProductos(){
    return this.http.get('http://localhost:3000/api/productos');
  }

  postProductos(Producto: Productos){
    return this.http.post('http://localhost:3000/api/productos', Producto);
  }

  putProductos(Producto: Productos){
    return this.http.put('http://localhost:3000/api/productos' + `/${Producto._id}`, Producto);
  }
  deleteProductos(_id: string){
    return this.http.delete('http://localhost:3000/api/productos' + `/${_id}`);
  }
  getProducto(_id: string){
    return this.http.get('http://localhost:3000/api/productos' + `/${_id}`);
  }
}
