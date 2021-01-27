import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormControl, NgForm, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Productos } from "../../models/productos";

@Component({
  selector: 'app-op-productos',
  templateUrl: './op-productos.component.html',
  styleUrls: ['./op-productos.component.css'],
  providers: [ProductosService]
})
export class OpProductosComponent implements OnInit {

  form: FormGroup;

  constructor(public productosService: ProductosService, private toast: ToastrService) { 
    this.buildForm();
   }
   p: number = 1;

  ngOnInit(): void {
    this.getProductos();
  }

  public buildForm() {
    this.form = new FormGroup({
      _id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(35),Validators.pattern(/^[A-Za-z0-9 ñ.]+$/)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100)], ),
      precio: new FormControl('', [Validators.required, Validators.min(1),Validators.max(100)]),
      foto: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required,Validators.min(1)]),
      categoria: new FormControl('', [Validators.required]),
    });
  }

  getProductos(){
    this.productosService.getProductos().subscribe(res =>{
      this.productosService.Producto = res as Productos[];
      console.log(res);
    })
  }

  addProducto(event: Event) {
    if(this.form.value._id){
      this.productosService.putProductos(this.form.value).subscribe(res=>{
        console.log(res);
        this.toast.success('Producto actualizado', 'Notificacion',{
          timeOut: 1500
        });
      })
    } else {
      event.preventDefault();
      const value = this.form.value;
      console.log(value);
      this.productosService.postProductos(value)
      .subscribe(res => {
        console.log(res);
        this.resetForm();
        this.getProductos();
        this.toast.success('Producto registrado', 'Notificacion',{
          timeOut: 1500
        });
      });
    }
  }

  editProducto(productos: Productos){
    this.productosService.selectedProducto = productos;
  }

  deleteProducto(_id: string){
    this.productosService.deleteProductos(_id).subscribe(res =>{
      console.log(res);
      this.getProductos();
      this.toast.info('Producto eliminado', 'Notificacion',{
        timeOut: 1500
      });
      this.resetForm();
    })
  }

  resetForm(){
    if(this.form){
      this.form.reset();
      this.getProductos();
    }
  }

}
