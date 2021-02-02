const express = require('express');
const router = express.Router();
const productosctrl = require('../controllers/productos.controles');

router.get('/', productosctrl.getProductos);
router.post('/', productosctrl.createProducto);
router.get('/:id', productosctrl.getProducto);
router.put('/:id', productosctrl.editProducto);
router.delete('/:id', productosctrl.deleteProducto);

module.exports = router;