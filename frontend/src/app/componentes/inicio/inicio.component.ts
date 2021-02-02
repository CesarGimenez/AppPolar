import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public identidad;
  public token;

  constructor(private empleadoService: EmpleadoService) { 
    this.identidad = empleadoService.getIdentidad();
    this.token = empleadoService.getToken();
   }

  ngOnInit(): void {
  }

}
