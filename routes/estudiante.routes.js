const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.post('/verificar-identidad', estudianteController.verificarIdentidad);
router.post('/enviar-codigo', estudianteController.enviarCodigo);
router.post('/validar-codigo', estudianteController.validarCodigo);
router.post('/register', estudianteController.register);

module.exports = router;