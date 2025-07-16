const express = require('express');
const router = express.Router();
const pasantiaController = require('../controllers/pasantiaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authMiddleware, pasantiaController.register); // solo si estás logueado
router.get('/compatibles/:estudianteId', pasantiaController.getCompatibles);
router.patch('/:id/estado', pasantiaController.cambiarEstado);

module.exports = router;
