import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, EffectCube, Swiper} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube]);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public identidad;
  public token;

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  constructor(private empleadoService: EmpleadoService) { 
    this.identidad = empleadoService.getIdentidad();
    this.token = empleadoService.getToken();
   }

  ngOnInit(): void {
  }
  Ocultar(){
    let parrafo = document.getElementById('parrafo');
    parrafo.classList.toggle('Ocultar');
    let card = document.getElementById('card');
    card.classList.toggle('Disminuir');
    let boton = document.getElementById('boton');
    boton.classList.toggle('Subir');
    if(boton.textContent == "Ver menos"){
      boton.textContent = "Leer mas";
    } else {
      boton.textContent = "Ver menos";
    }
  }
  Ocultar2(){
    let parrafo = document.getElementById('parrafo1');
    parrafo.classList.toggle('Ocultar');
    let card = document.getElementById('card1');
    card.classList.toggle('Disminuir');
    let boton = document.getElementById('boton1');
    boton.classList.toggle('Subir1');
    if(boton.textContent == "Ver menos"){
      boton.textContent = "Leer mas";
    } else {
      boton.textContent = "Ver menos";
    }
  }
}
