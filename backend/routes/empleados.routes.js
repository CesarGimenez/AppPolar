const express = require('express');
const router = express.Router();
const empleado = require('../controllers/empleados.controles');

router.get('/', empleado.getEmpleados);
router.post('/', empleado.createEmpleado);
router.get('/:id', empleado.getEmpleado);
router.put('/:id', empleado.editEmpleado);
router.delete('/:id', empleado.deleteEmpleado);

module.exports = router;