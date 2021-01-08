const empleados = require("../models/empleados");

const empleadosctrl = {};

empleadosctrl.getEmpleados = async (req, res) => {
    const empleado = await empleados.find();
    res.json(empleado);
}

empleadosctrl.createEmpleado = async(req,res)=>{
    const nuevoEmpleado = new empleados({
        nombre: req.body.nombre,
        email: req.body.email,
        pass: req.body.pass,
        confirmpass: req.body.confirmpass,
        fechanac: req.body.fechanac,
        categoria: req.body.categoria,
        genero: req.body.genero,
    });
    await nuevoEmpleado.save();
    res.json("registrado");
} 

empleadosctrl.getEmpleado = async(req,res) =>{
    const empleado = await empleados.findById(req.params.id);
    res.json(empleado);
}
empleadosctrl.editEmpleado = async(req,res) =>{
    const empleadoupdate = {
        nombre: req.body.nombre,
        email: req.body.email,
        pass: req.body.pass,
        confirmpass: req.body.confirmpass,
        fechanac: req.body.fechanac,
        categoria: req.body.categoria,
        genero: req.body.genero,
    }
    await empleados.findByIdAndUpdate(req.params.id, {$set: empleadoupdate}, {new: true});
    res.json("Actualizado");
}
empleadosctrl.deleteEmpleado = async(req,res) =>{
    await empleados.findByIdAndDelete(req.params.id)
    res.json("Eliminado");
}

module.exports = empleadosctrl;