export class Productos {
    constructor(_id='', nombre='', descripcion='', precio=0, foto='', categoria='',stock=''){
        this._id= _id;
        this.nombre= nombre;
        this.descripcion = descripcion,
        this.precio = precio,
        this.foto = foto,
        this.categoria = categoria,
        this.stock = stock
    }
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    foto: string;
    categoria: string;
    stock: string;
}
