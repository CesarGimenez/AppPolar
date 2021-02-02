import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmptyError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  getVentas(){
    return this.http.get('http://localhost:3000/api/ventas');
  }
  save_venta(data){
    return this.http.post('http://localhost:3000/api/ventas',data);
  }
}


