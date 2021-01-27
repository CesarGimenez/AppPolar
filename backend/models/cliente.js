const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteschema = new Schema({
    nombre: { type : String, required: true},
    dni: { type: String},
    email: { type: String},
    numero: { type: String},
    facebook: { type: String},
    instagram: { type: String},
    twitter: { type: String},
})

module.exports = mongoose.model('clientes', clienteschema);