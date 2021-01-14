import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEmpleados = [];
    for(const empleado of value){
      if(empleado.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultEmpleados.push(empleado);
      }
    }
    return resultEmpleados;

    const resultProductos = [];
    for(const producto of value){
      if(producto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultProductos.push(producto);
      }
    }
    return resultProductos;
  }

}
