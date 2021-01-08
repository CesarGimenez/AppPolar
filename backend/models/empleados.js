const mongoose = require('mongoose');
const { Schema } = mongoose;

const empleadoschema = new Schema({
    nombre: { type : String, required: true},
    fechanac: { type: String},
    email: { type: String},
    pass: { type: String},
    confirmpass: { type: String},
    categoria: { type: String},
    depto: { type: String},
    genero: { type: String},
})

module.exports = mongoose.model('empleados', empleadoschema);
