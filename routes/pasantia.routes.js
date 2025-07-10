const express = require('express');
const router = express.Router();
const pasantiaController = require('../controllers/pasantiaController');

router.post('/register', pasantiaController.register);
router.get('/compatibles/:estudianteId', pasantiaController.getCompatibles);
router.patch('/:id/estado', pasantiaController.cambiarEstado);



module.exports = router;
