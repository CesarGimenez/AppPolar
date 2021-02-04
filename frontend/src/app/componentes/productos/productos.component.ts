import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Productos } from "../../models/productos";
import { EmpleadoService } from "../../services/empleado.service";
import { Router } from '@angular/router';
import { PdfMakeWrapper, Table, Canvas, Line } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

interface DataResponse {
  _id: any;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

type TableRow = [string, string, string, number, number];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  public identidad;
  public token;
  public productoss;

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
      this.productoss = res;
      console.log(res);
    })
  }
  generatePDF(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Listado de productos ' + new Date(),
  });
    pdf.header('Empresas Polar C.A');
    pdf.add('Listado de productos');
    

    pdf.add(
      new Canvas([
          new Line(10,10).end
      ]).end
    );

    pdf.add(this.createTable(null));

    pdf.create().open();
  }
  createTable(data: DataResponse[]){
    return new Table([
      [ 'Codigo de producto','Nombre del producto', 'Tipo de producto', 'Precio ($)', 'Stock'],
      ...this.extractData(data)
  ]).layout({
    fillColor: (rowIndex:number, node:any, columnindex:number)=>{
      return rowIndex === 0 ? '#CCCCCC' : '' ;
    }
  }).end
  }
  extractData(data: DataResponse[]): TableRow[] {
    data = this.productoss;
    return data.map(row=>[row._id, row.nombre, row.categoria, row.precio, row.stock]);
  }

}