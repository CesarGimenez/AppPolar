const Venta = require('../models/venta');
const Detalleventa = require('../models/detalleventa');
const producto = require('../models/productos');

function registrar(req, res){
    let venta = new Venta();
    venta.idcliente = req.body.idcliente;
    venta.idempleado = req.body.idempleado;
    venta.total = req.body.total;

    venta.save((err,venta_save)=>{
        if(venta_save){
            let detalles = req.body.detalles;
            detalles.forEach((element,index) => {
                let detalleventa = new Detalleventa();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id;

                detalleventa.save((err,detalle_save)=>{
                    if(detalle_save){
                        producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                producto.findByIdAndUpdate({_id:producto_data._id},
                                    {stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},(err,producto_edit)=>{
                                        res.end();
                                    });
                            } else {
                                res.send('No se encontro el producto');
                            }
                        });
                    } else {
                        res.send('No se pudo registrar los detalles de venta');
                    }
                });
            });
        } else {
            res.send('No se pudo registrar la venta');
        }
    })
}

function getVenta(req,res){
    let id = req.params['id'];
    Venta.findById(id).populate('idcliente').populate('idempleado').exec((err,data_venta)=>{
        if(data_venta){
            Detalleventa.find({venta:data_venta._id}).populate('idproducto').exec({venta:id},(err,data_detalle)=>{
                if(data_detalle){
                    res.send({
                        data: {
                            venta: data_venta,
                            detalles: data_detalle
                        }
                    })
                }
            });
        }
    });
}

function listarVentas(req,res){
    Venta.find().populate('idcliente').populate('idempleado').exec((err,data_ventas)=>{
        if(data_ventas){
            res.send({ventas: data_ventas})
        } else {
            res.send({message:'No se encuentran ventas realizadas'})
        }
    });
}

function detalles_venta(req,res){
    let id = req.params['id'];
    Detalleventa.find({venta:id}).populate('idproducto').exec((err,data_detalles)=>{
        if(data_detalles){
            res.send({detalles: data_detalles})
        }else {
            res.send({message:'No hay registros de detalles'});
        }
    })
}
function fechasVenta(req,res){
    let fecha1 = req.body.fecha1;
    let fecha2 = req.body.fecha2;
    Venta.find({$and:[{"fecha":{$gte:fecha1}},{"fecha":{$lte:fecha2}}]}).populate('idcliente').populate('idempleado').exec((err,data)=>{
        if(data){
            res.send(data);
        } else {
            res.sed('No hay ventas');
        }
    });
}

module.exports = {
    registrar,
    getVenta,
    listarVentas,
    detalles_venta,
    fechasVenta
}