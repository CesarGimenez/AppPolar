import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VentasService } from 'src/app/services/ventas.service';
import { PdfMakeWrapper, Table, Canvas, Line } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

interface DataResponse {
  idproducto: any;
  categoria: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

type TableRow = [string, string,number, number, number];

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {

  public id;
  public ventares;
  public venta;
  public detalleventa;
  public token;
  public fecha;

  constructor(private _router: ActivatedRoute, private ventaService: VentasService,
              private empleadoService:EmpleadoService, private router: Router) { 
  this.token = empleadoService.getToken();
  }

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    } else {
      this._router.params.subscribe(params =>{
      this.id = params['id'];

      this.ventaService.getVenta(this.id).subscribe(response=>{
        this.ventares = response;
        this.venta = this.ventares.data.venta;
        this.detalleventa = this.ventares.data.detalles;
        this.fecha = this.venta.fecha;
      })
    });
    }
  }
  generatePDF(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Factura: ' + this.id,
  });
    pdf.header('Empresas Polar C.A');
    pdf.add('Codigo de venta: ' + this.id + '  |   Fecha: ' + this.fecha);
    pdf.add('Cliente: '+ this.venta.idcliente.nombre + '  |  Direccion. entrega: ' + this.venta.idcliente.ubicacion+ '  |  CI/RIF: ' + this.venta.idcliente.dni);

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
      [ 'Nombre del producto', 'Tipo de producto', 'Cantidad', 'Precio ($)', 'Subtotal ($)'],
      ...this.extractData(data)
  ]).layout({
    fillColor: (rowIndex:number, node:any, columnindex:number)=>{
      return rowIndex === 0 ? '#CCCCCC' : '' ;
    }
  }).end
  }
  extractData(data: DataResponse[]): TableRow[] {
    data = this.detalleventa;
    return data.map(row=>[row.idproducto.nombre, row.idproducto.categoria, row.idproducto.precio, row.cantidad, row.cantidad * row.idproducto.precio]);
  }

}
