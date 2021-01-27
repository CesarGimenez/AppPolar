const mongoose = require('mongoose');
const { Schema } = mongoose;

const productosschema = new Schema({
    nombre: { type : String, required: true},
    descripcion: { type: String},
    precio: { type: Number},
    categoria: { type: String},
    foto: { type: String},
    stock: { type: Number }
})

module.exports = mongoose.model('productos', productosschema);
