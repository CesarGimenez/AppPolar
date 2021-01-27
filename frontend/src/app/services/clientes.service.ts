import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/clientes';
import { EmptyError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente: Cliente;
  Cliente: Cliente[];
  constructor(private http: HttpClient) { 
    this.selectedCliente = new Cliente();
   }

  getClientes(){
    return this.http.get('http://localhost:3000/api/clientes');
  }

  postCliente(Cliente: Cliente){
    return this.http.post('http://localhost:3000/api/clientes', Cliente);
  }

  putCliente(Cliente: Cliente){
    return this.http.put('http://localhost:3000/api/clientes' + `/${Cliente._id}`, Cliente);
  }
  deleteCliente(_id: string){
    return this.http.delete('http://localhost:3000/api/clientes' + `/${_id}`);
  }
  getCliente(email: string){
    
  }
}

