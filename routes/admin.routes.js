const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.register);
router.post('/verificar-dni', adminController.verificarDNI);


module.exports = router;
