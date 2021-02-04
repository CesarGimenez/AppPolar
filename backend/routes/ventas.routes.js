const express = require('express');
const router = express.Router();
const venta = require('../controllers/venta.controles');

router.post('/', venta.registrar);
router.get('/:id', venta.getVenta);
router.get('/', venta.listarVentas);
router.get('/detalles/:id', venta.detalles_venta);
router.post('/fechas', venta.fechasVenta);

module.exports = router;