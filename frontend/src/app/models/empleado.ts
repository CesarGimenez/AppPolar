export class Empleado {

    constructor(_id='', nombre='', email='', pass='', confirmpass='', categoria='', fechanac='', genero=''){
        this._id= _id;
        this.nombre= nombre;
        this.email = email,
        this.pass = pass,
        this.confirmpass = confirmpass,
        this.categoria = categoria,
        this.fechanac = fechanac,
        this.genero = genero
    }
    _id: string;
    nombre: string;
    email: string;
    pass: string;
    confirmpass: string;
    categoria: string;
    fechanac: string;
    genero: string;
}
