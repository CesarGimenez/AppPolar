import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';
import { parse } from 'uuid';
import { Detalleventa } from "../../../models/detalleventa";

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {

  public token;
  public identidad;
  public clientes: any;
  public product;
  public productos: any = [];
  public stock;
  public venta: any = {
    idcliente: '',
  };
  public data_detalle: Array<any> = [];
  public detalle: any = {
    idproducto:'',
  };
  public error_message;
  public error_cliente;
  public total = 0;


  constructor(private empleadoService:EmpleadoService, private router: Router,
              private clienteService: ClienteService, private productoService: ProductosService, private ventaService: VentasService) { 
    this.token = empleadoService.getToken();
    this.identidad = empleadoService.getIdentidad();
  }

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    } else {
      this.clienteService.getClientes().subscribe(
        response =>{
          this.clientes = response;
          console.log(this.clientes);
        }
      )
      this.productoService.getProductos().subscribe(
        response =>{
          this.productos = response;
          console.log(this.productos);
        }
      )
    }
  }

  get_data_producto(_id: string){
    this.productoService.getProducto(_id).subscribe(
      response =>{
        this.product = response;
        this.stock = this.product.stock;
      }
    )
  }
  save_detalle(detalleform){
    if(detalleform.valid){
      if(detalleform.value.cantidad <= this.stock){
        if(detalleform.value.cantidad>0){
          this.data_detalle.push({
          idproducto: detalleform.value.idproducto,
          cantidad: detalleform.value.cantidad,
          producto: this.product.nombre,
          precio: this.product.precio,
        });
        this.detalle = new Detalleventa();
        this.stock = '';
        this.error_message = '';
        this.total = this.total + (parseInt(this.product.precio) * parseInt(detalleform.value.cantidad));
        } else {
          this.error_message = 'No se admiten cantidades menores o iguales a 0';
        }
      } else {
        this.error_message = 'No existe suficiente stock para la venta';
      }
    }else{
      this.error_message = 'Debe seleccionar un producto';
    }
  }
  close_alert(){
    this.error_message = '';
  }
  eliminar(idx, precio, cantidad){
    this.data_detalle.splice(idx,1);
    this.total = this.total - (parseInt(precio)* parseInt(cantidad));
  }
  onSubmit(ventaform){
    if(ventaform.valid){
      if(this.data_detalle.length > 0){
        let data = {
        idcliente :ventaform.value.idcliente,
        idempleado: this.identidad._id,
        detalles: this.data_detalle,
        total: this.total,
      }
      this.ventaService.save_venta(data).subscribe(
        response =>{
          this.router.navigate(['ventas']);
        }
      )
      } else {
        this.error_cliente = 'No ha ingresado detalles a la venta';
      }
    }else{
      this.error_cliente = 'Debe seleccionar un cliente para realizar una venta';
    }
  }
  close_alertcliente(){
    this.error_cliente = '';
  }
}
