export class Cliente {

    constructor(_id='', dni='', numero='', nombre='', email='', facebook='', instagram='', twitter=''){
        this._id= _id;
        this.nombre= nombre;
        this.dni = dni;
        this.email = email,
        this.numero = numero,
        this.facebook = facebook,
        this.instagram = instagram,
        this.twitter = twitter
    }
    _id: string;
    nombre: string;
    dni: string;
    email: string;
    numero: string;
    facebook: string;
    instagram: string;
    twitter: string;
}