import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public token;
  public ventas: any=[];
  public ventaslist;

  constructor(private empleadoService:EmpleadoService, private router: Router, private ventaService: VentasService) { 
    this.token = empleadoService.getToken();
   }
   p: number = 1;

  ngOnInit(): void {
    if(!this.token){
      this.router.navigate(['inicio']);
    } else {
      this.ventaService.getVentas().subscribe(
        response => {
          this.ventas = response;
          this.ventaslist = this.ventas.ventas;
          console.log(this.ventaslist);
        }
      )
    }
  }

}
