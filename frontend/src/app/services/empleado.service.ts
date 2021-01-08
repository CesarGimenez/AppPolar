import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { EmptyError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  selectedEmpleado: Empleado;
  Empleado: Empleado[];
  constructor(private http: HttpClient) { 
    this.selectedEmpleado = new Empleado();
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
}
