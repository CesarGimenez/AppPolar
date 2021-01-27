const empleados = require("../models/empleados");
let jwt = require('../helpers/jwt');
let bcrypt = require('bcrypt-nodejs');

const empleadosctrl = {};

empleadosctrl.Login = (req,res) =>{
    empleados.findOne({email: req.body.email}, (err,user_data)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'})
        } else {
            if(user_data){
                bcrypt.compare(req.body.pass, user_data.pass, function(err,check){
                    if(check){
                        if(req.body.gettoken){
                            res.status(200).send({
                                user: user_data,
                                jwt: jwt.createToken(user_data)
                            })
                        } else{
                            res.status(200).send({
                                user: user_data,
                                message:'No hay token',
                                jwt: jwt.createToken(user_data)
                            })
                        }
                    } else {
                        res.status(403).send({message: 'Correo o contraseña incorrectos'})
                    }
                });
            } else{
                res.status(403).send({message: 'El correo no existe'})
            }
        }
    })
}

empleadosctrl.getEmpleados = async (req, res) => {
    const empleado = await empleados.find();
    res.json(empleado);
}

empleadosctrl.createEmpleado = async(req,res)=>{
    bcrypt.hash(req.body.pass, null, null, async function(err,hash){
        if(hash){
           const nuevoEmpleado = new empleados({
            nombre: req.body.nombre,
            email: req.body.email,
            pass: hash,
            confirmpass: hash,
            fechanac: req.body.fechanac,
            categoria: req.body.categoria,
            genero: req.body.genero,
            });
            await nuevoEmpleado.save();
        }      
    })
    res.json("registrado");
} 

empleadosctrl.getEmpleado = async(req,res) =>{
    const empleado = await empleados.findById(req.params.id);

    res.json(empleado);
}
empleadosctrl.editEmpleado = async(req,res) =>{
    bcrypt.hash(req.body.pass, null, null, async function(err,hash){
        if(hash){
            const empleadoupdate = {
            nombre: req.body.nombre,
            email: req.body.email,
            pass: hash,
            confirmpass: hash,
            fechanac: req.body.fechanac,
            categoria: req.body.categoria,
            genero: req.body.genero,
            }
            await empleados.findByIdAndUpdate(req.params.id, {$set: empleadoupdate}, {new: true});
        }
    })
    res.json("Actualizado");
}
empleadosctrl.deleteEmpleado = async(req,res) =>{
    await empleados.findByIdAndDelete(req.params.id)
    res.json("Eliminado");
}

module.exports = empleadosctrl;