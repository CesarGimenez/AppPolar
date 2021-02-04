const mongoose = require('mongoose');
const { Schema } = mongoose;

const ventaschema = new Schema({
    idcliente: { type : Schema.ObjectId, ref:'clientes', required: true},
    idempleado: { type : Schema.ObjectId, ref:'empleados', required: true},
    fecha: { type: Date, default: Date.now},
    total: { type: Number}
})

module.exports = mongoose.model('ventas', ventaschema);