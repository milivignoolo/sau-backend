const express = require('express');
const router = express.Router();
const { enviarCodigo } = require('../controllers/emailController');

router.post('/enviar-codigo', enviarCodigo);

module.exports = router;
