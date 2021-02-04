import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VentasService } from 'src/app/services/ventas.service';
import { PdfMakeWrapper, Table, Canvas, Line } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

interface DataResponse {
  _id: any;
  idempleado: any;
  idcliente: any;
  fecha: string;
  total: undefined;
}

type TableRow = [any, any, any, string, undefined];

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public token;
  public ventas: any=[];
  public ventaslist: any=[];
  public totalVendido = 0;
  public fechainicio;
  public fechafinal;
  public error = '';

  constructor(private empleadoService:EmpleadoService, private router: Router, private ventaService: VentasService) { 
    this.token = empleadoService.getToken();
   }
   p: number = 1;

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    } else {
      this.ventaService.getVentas().subscribe(
        response => {
          this.ventas = response;
          this.ventaslist = this.ventas.ventas;
          for(let i = 0; i < this.ventaslist.length; i++){
            this.totalVendido = this.totalVendido + this.ventaslist[i].total;
            console.log(this.totalVendido);
          }
        }
      )
    }
  }
  generatePDF(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Listado de ventas ' + new Date(),
  });
    pdf.header('Empresas Polar C.A');
    pdf.add('Listado de ventas');
    

    pdf.add(
      new Canvas([
          new Line(10,10).end
      ]).end
    );

    pdf.add(this.createTable(null));

    pdf.add(
      new Canvas([
          new Line(10,10).end
      ]).end
    );

    pdf.add('-------------------------------------------------------Total vendido: $ ' + this.totalVendido + '------------------------------------------------');

    pdf.create().open();
  }
  createTable(data: DataResponse[]){
    return new Table([
      [ 'Codigo de venta','Cliente', 'Vendedor', 'Fecha', 'Total'],
      ...this.extractData(data)
  ]).layout({
    fillColor: (rowIndex:number, node:any, columnindex:number)=>{
      return rowIndex === 0 ? '#CCCCCC' : '' ;
    }
  }).end
  }
  extractData(data: DataResponse[]): TableRow[] {
    data = this.ventaslist;
    return data.map(row=>[row._id, row.idcliente.nombre, row.idempleado.nombre, row.fecha, row.total]);
  }
  obtenerFechas(){
    let fecha_inicio = new Date(this.fechainicio);
    let fecha_final = new Date(this.fechafinal);
    if(this.fechainicio == undefined || this.fechafinal == undefined){
      this.error = 'Debe seleccionar ambas fechas'
    } else {
      let data = {
        fecha1 : fecha_inicio.toISOString(),
        fecha2 : fecha_final.toISOString()
      }
      console.log(fecha_inicio.toISOString());
      console.log(fecha_final.toISOString());
      this.ventaService.getVentasFecha(data).subscribe(res =>{
        this.ventaslist = res;
        console.log(this.ventaslist);
      });
    }
  }
  close_alert(){
    this.error = '';
  }
}
