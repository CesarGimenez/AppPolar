import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from "../../models/empleado";
import { EmpleadoService } from "../../services/empleado.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identidad;
  public data_error;
  constructor(
    private empladoService: EmpleadoService, 
    private router: Router,
    private toast: ToastrService) { 
    this.user = new Empleado();
    this.token = empladoService.getToken();
   }

  ngOnInit(): void {
    if(this.token){
      this.router.navigate(['inicio']);
    }
  }

  close_alert(){
    this.data_error="";
  }

  login(loginForm){
    if(loginForm.valid){
      this.empladoService.Login(this.user).subscribe(
        response => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this.empladoService.Login(this.user, true).subscribe(
            response =>{
              localStorage.setItem('identidad', JSON.stringify(response.user));
              this.router.navigate(['inicio']);
              this.toast.success('Ingreso exitoso', 'Notificacion',{
                timeOut: 1500
              });
            },
            error =>{

            }
          )
        },
        error =>{
          this.data_error = error.error.message;
        }
      )
    } else{
      this.data_error = "Debe llenar todos los campos";
    }
  }

}
