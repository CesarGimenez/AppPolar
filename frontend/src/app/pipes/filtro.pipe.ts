import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEmpleados = [];
    for(const empleado of value){
      if(empleado.nombre.indexOf(arg) > -1){
        resultEmpleados.push(empleado);
      }
    }
    return resultEmpleados;
  }

}
