export class Detalleventa {

    constructor(_id='', idproducto='', cantidad=0){
        this._id= _id;
        this.idproducto= idproducto;
        this.cantidad = cantidad;
    }
    _id: string;
    idproducto: string;
    cantidad: number;
}