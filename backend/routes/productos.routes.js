const express = require('express');
const router = express.Router();
const producto = require('../controllers/productos.controles');
let multipart = require('connect-multiparty');
const productosctrl = require('../controllers/productos.controles');
let path = multipart({uploadDir: './backend/uploads'})

router.get('/', producto.getProductos);
router.get('/:img?',productosctrl.getProductoImg)
router.post('/', path, producto.createProducto);
router.get('/:id', producto.getProducto);
router.put('/:id', producto.editProducto);
router.delete('/:id', producto.deleteProducto);

module.exports = router;