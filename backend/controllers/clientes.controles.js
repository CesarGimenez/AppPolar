const clientes = require('../models/cliente');

const clientesctrl = {};

clientesctrl.getClientes = async (req, res) => {
    const cliente = await clientes.find();
    res.json(cliente);
}

clientesctrl.createCliente = async(req,res)=>{
    const nuevoCliente = new clientes({
        nombre: req.body.nombre,
        dni: req.body.dni,
        email: req.body.email,
        numero: req.body.numero,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
    });
    await nuevoCliente.save();
    res.json("registrado");
} 

clientesctrl.getCliente = async(req,res) =>{
    const cliente = await clientes.findById(req.params.id);
    res.json(cliente);
}
clientesctrl.editCliente = async(req,res) =>{
    const clienteupdate = {
        nombre: req.body.nombre,
        dni: req.body.dni,
        email: req.body.email,
        numero: req.body.numero,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
    }
    await clientes.findByIdAndUpdate(req.params.id, {$set: clienteupdate}, {new: true});
    res.json("Actualizado");
}
clientesctrl.deleteCliente= async(req,res) =>{
    await clientes.findByIdAndDelete(req.params.id)
    res.json("Eliminado");
}

module.exports = clientesctrl;