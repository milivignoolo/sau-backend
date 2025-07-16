const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Estudiante, Empresa, Administrador } = require('../models/initModels')(require('../config/database'));

const SECRET_KEY = process.env.JWT_SECRET;

const authController = {
  login: async (req, res) => {
    const { email, contraseña } = req.body;

    // Buscar usuario en las 3 tablas
    let usuario = await Estudiante.findOne({ where: { email } });
    let role = 'estudiante';

    if (!usuario) {
      usuario = await Empresa.findOne({ where: { email } });
      role = 'empresa';
    }

    if (!usuario) {
      usuario = await Administrador.findOne({ where: { email } });
      role = 'administrador';
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar estado (por ej. empresa aprobada, admin activo, estudiante activo)
    if (role === 'empresa' && usuario.estado !== 'aprobada') {
      return res.status(403).json({ error: 'Empresa no aprobada' });
    }

    if (role === 'administrador' && usuario.estado !== 'activo') {
      return res.status(403).json({ error: 'Administrador bloqueado' });
    }

    // Validar contraseña
    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: usuario.id, role }, SECRET_KEY, { expiresIn: '8h' });

    // Enviar datos relevantes al frontend
    return res.json({
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre || usuario.razon_social || 'Usuario',
        role,
      },
    });
  },
};

module.exports = authController;
