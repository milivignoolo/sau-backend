const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/verificar-cuit', empresaController.verificarCuit);
router.post('/register', empresaController.register);
router.patch('/:id/aprobar', empresaController.aprobarEmpresa);

module.exports = router;
