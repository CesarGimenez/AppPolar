const productos = require("../models/productos");

const productosctrl = {};

productosctrl.getProductos = async (req, res) => {
    const producto = await productos.find();
    res.json(producto);
}

productosctrl.createProducto = async(req,res)=>{
    let imagen_path = req.files.foto.path;
    let name = imagen_path.split('\\');
    let imagen_name = name[2];
    const nuevoProducto = new productos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        foto: imagen_name,
        stock: req.body.stock,
    });
    await nuevoProducto.save();
    res.send({producto: nuevoProducto});
} 

productosctrl.getProducto = async(req,res) =>{
    const producto = await productos.findById(req.params.id);
    res.json(producto);
}
productosctrl.getProductoImg  = async(req,res) =>{
    let img = req.params['img'];
    productos.find({foto: new RegExp(img, 'i')}, (err, producto_img)=>{
        if(err){
            res.send({message:'no se registro'})
        } else {
            if(producto_img){
                res.send({producto: producto_img})
                
            }
        }
    })
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