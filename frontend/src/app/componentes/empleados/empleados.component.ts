import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { FormControl, NgForm, FormGroup, Validators } from "@angular/forms";
import { Empleado } from "../../models/empleado";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

  form: FormGroup;
  public identidad;
  public token;

  constructor(public empleadoService: EmpleadoService, private toast: ToastrService, private router: Router) { 
    this.buildForm();
    this.identidad = empleadoService.getIdentidad();
    this.token = empleadoService.getToken();
  }
  filterEmpleado = '';
  p: number = 1;
  public emailvalido = true;
  public fechavalida = true;
  public passvalido = true;
  public message = '';
  Empleado = [];
  public emailduplicado = '';
  public passmessage = '';

  ngOnInit(): void {
    if(this.identidad.categoria !== 'Gerente'){
      this.router.navigate(['inicio']);
    }
    if(!this.token){
      this.router.navigate(['inicio']);
    }
    this.getEmpleados();
  }

  public buildForm() {
    this.form = new FormGroup({
      _id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)]),
      fechanac: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmpass: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
    });
  }

  addEmpleado(event: Event) {
    if(this.form.value._id){
      this.empleadoService.putEmpleado(this.form.value).subscribe(res=>{
        console.log(res);
        this.toast.success('Empleado actualizado', 'Notificacion',{
          timeOut: 1500
        });
      })
    } else {
      event.preventDefault();
      const value = this.form.value;
      console.log(value);
      this.empleadoService.postEmpleado(value)
      .subscribe(res => {
        console.log(res);
        this.resetForm();
        this.getEmpleados();
        this.toast.success('Empleado registrado', 'Notificacion',{
          timeOut: 1500
        });
      });
    }
    
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe(res =>{
      this.empleadoService.Empleado = res as Empleado[];
      this.Empleado = res as Empleado[];
      console.log(res);
    })
  }

  editEmpleado(empleado: Empleado){
    this.resetForm();
    this.empleadoService.selectedEmpleado = empleado;
    this.obtenerFecha();
    this.confirmPass();
  }

  deleteEmpleado(_id: string){
    this.empleadoService.deleteEmpleado(_id).subscribe(res =>{
      console.log(res);
      this.getEmpleados();
      this.toast.info('Empleado eliminado', 'Notificacion',{
        timeOut: 1500
      });
      this.resetForm();
    })
  }

  resetForm(){
    if(this.form){
      this.form.reset();
      this.getEmpleados();
      this.emailvalido = true;
      this.fechavalida = true;
      this.passvalido = true;
    }
  }

  obtenerFecha() {
    let ahora = new Date();
    let fechanacimiento = new Date(this.form.value.fechanac);
    let edad1 = ahora.getFullYear() - fechanacimiento.getFullYear();
    console.log(fechanacimiento);
    console.log(fechanacimiento.toISOString());

    if(edad1 <= 0){
        this.message = "fecha no valida";
        this.fechavalida = false;
    } else if(edad1 < 18){
        this.message = "Es menor de edad";
        this.fechavalida = false;
    } else if (edad1 > 60){
        this.message = "Es viejo";
        this.fechavalida = false;
    } else {
        this.message ="";
        this.fechavalida = true;
    }
    console.log(this.message);
}
  emailDuplicado(){
    const busqueda = this.Empleado.find(letter =>  letter.email === this.form.value.email);
    if(busqueda == undefined){
      this.emailvalido = true;
    } else {
      this.emailvalido = false;
      this.emailduplicado = "Correo en uso";
    }
  }
  confirmPass(){
    let pass = this.form.value.pass;
    let confirmpass = this.form.value.confirmpass;
    if(pass != confirmpass){
      console.log("no son iguales")
      this.passmessage = "Las contraseñas no coinciden";
      this.passvalido = false;
    } else {
      this.passmessage = "";
      this.passvalido = true;
    }
  }
}
