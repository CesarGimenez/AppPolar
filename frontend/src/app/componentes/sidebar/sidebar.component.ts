import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "src/app/services/empleado.service";
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identidad;
  public hora;

  constructor(private empleadoService: EmpleadoService) { 
    this.identidad = empleadoService.getIdentidad();
    
   }

  ngOnInit(): void {
    console.log(this.identidad);
    this.hora = moment().format('LT');
  }

}
