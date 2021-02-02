import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { EmptyError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  selectedEmpleado: Empleado;
  Empleado: Empleado[];
  public user;
  public token;
  public identidad;
  constructor(private http: HttpClient) { 
    this.selectedEmpleado = new Empleado();
    this.user = new Empleado();
   }

  getEmpleados(){
    return this.http.get('http://localhost:3000/api/empleados');
  }

  postEmpleado(Empleado: Empleado){
    return this.http.post('http://localhost:3000/api/empleados', Empleado);
  }

  putEmpleado(Empleado: Empleado){
    return this.http.put('http://localhost:3000/api/empleados' + `/${Empleado._id}`, Empleado);
  }
  deleteEmpleado(_id: string){
    return this.http.delete('http://localhost:3000/api/empleados' + `/${_id}`);
  }
  getEmpleado(email: string){
    
  }
  Login(user, gettoken = null):Observable<any>{
    let json = user;
    if(gettoken != null){
      gettoken = true;
    }
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/empleados/login', json, {headers:headers})
  }
  Logout(){
    let token = localStorage.removeItem('token');
    return token;
  }
  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    } else{
      this.token= null
    }
    return this.token;
  }
  getIdentidad():Observable<any>{
    let identidad = JSON.parse(localStorage.getItem('identidad'));
    if(identidad){
      this.identidad = identidad;
    } else{
      this.identidad= null
    }
    return this.identidad;
  }
}
