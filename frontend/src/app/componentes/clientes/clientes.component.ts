import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clientes.service';
import { FormControl, NgForm, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../models/clientes";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  form: FormGroup;
  public token;

  constructor(public ClienteService: ClienteService, private toast: ToastrService,private empleadoService:EmpleadoService, 
    private router:Router) { 
    this.buildForm();
    this.token = empleadoService.getToken();
  }
  p: number = 1;

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    }
    this.getClientes();
  }

  public buildForm() {
    this.form = new FormGroup({
      _id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)]),
      dni: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      numero: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      ubicacion: new FormControl('', [Validators.required]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
    });
  }

  addCliente(event: Event) {
    if(this.form.value._id){
      this.ClienteService.putCliente(this.form.value).subscribe(res=>{
        console.log(res);
        this.toast.success('Cliente actualizado', 'Notificacion',{
          timeOut: 1500
        });
      })
    } else {
      event.preventDefault();
      const value = this.form.value;
      console.log(value);
      this.ClienteService.postCliente(value)
      .subscribe(res => {
        console.log(res);
        this.resetForm();
        this.getClientes();
        this.toast.success('Cliente registrado', 'Notificacion',{
          timeOut: 1500
        });
      });
    }
    
  }

  getClientes(){
    this.ClienteService.getClientes().subscribe(res =>{
      this.ClienteService.Cliente = res as Cliente[];
      console.log(res);
    })
  }

  editCliente(cliente: Cliente){
    this.ClienteService.selectedCliente = cliente;
  }

  deleteCliente(_id: string){
    this.ClienteService.deleteCliente(_id).subscribe(res =>{
      console.log(res);
      this.getClientes();
      this.toast.info('Cliente eliminado', 'Notificacion',{
        timeOut: 1500
      });
      this.resetForm();
    })
  }

  resetForm(){
    if(this.form){
      this.form.reset();
      this.getClientes();
    }
  }

}
