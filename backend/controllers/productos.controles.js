const productos = require("../models/productos");

const productosctrl = {};

productosctrl.getProductos = async (req, res) => {
    const producto = await productos.find();
    res.json(producto);
}

productosctrl.createProducto = async(req,res)=>{
    const nuevoProducto = new productos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        foto: req.body.foto,
    });
    await nuevoProducto.save();
    res.json("registrado");
} 

productosctrl.getProducto = async(req,res) =>{
    const producto = await productos.findById(req.params.id);
    res.json(producto);
}
productosctrl.editProducto = async(req,res) =>{
    const productoupdate = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        foto: req.body.foto,
    }
    await productos.findByIdAndUpdate(req.params.id, {$set: productoupdate}, {new: true});
    res.json("Actualizado");
}
productosctrl.deleteProducto = async(req,res) =>{
    await productos.findByIdAndDelete(req.params.id)
    res.json("Eliminado");
}

module.exports = productosctrl;