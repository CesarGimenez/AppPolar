const mongoose = require('mongoose');
const { Schema } = mongoose;

const detalleventachema = new Schema({
    idproducto: { type : Schema.ObjectId, ref:'productos', required: true},
    cantidad: { type: Number},
    venta: { type: Schema.ObjectId, ref: 'ventas'}
})

module.exports = mongoose.model('detalleventa', detalleventachema);