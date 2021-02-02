import { Component } from '@angular/core';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public identidad;
  public token;
  constructor(public empleadoService: EmpleadoService){
    this.identidad = empleadoService.getIdentidad();
    this.token = empleadoService.getToken();
  }

}
