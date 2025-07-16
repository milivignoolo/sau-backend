const bcrypt = require('bcrypt');
const { Administrador, PersonalSAU } = require('../models/initModels')(require('../config/database'));

const adminController = {
  register: async (req, res) => {
    try {
      const { dni, nombre, apellido, email, contraseña } = req.body;

      // Verificar existencia en la base PersonalSAU
      const personal = await PersonalSAU.findOne({
        where: { dni, nombre, apellido }
      });

      if (!personal) {
        return res.status(404).json({ error: 'No se encontró coincidencia en la base del personal autorizado (SAU).' });
      }

      // Verificar si ya está registrado como administrador
      const existe = await Administrador.findOne({ where: { dni } });
      if (existe) {
        return res.status(400).json({ error: 'Este administrador ya está registrado.' });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Crear el administrador
      const nuevoAdmin = await Administrador.create({
        dni,
        nombre,
        apellido,
        email,
        contraseña: hashedPassword,
        estado: 'activo'
      });

      res.status(201).json({
        mensaje: 'Administrador registrado con éxito.',
        admin: nuevoAdmin
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno al registrar administrador.' });
    }
  },
  verificarDNI: async (req, res) => {
    try {
      const { dni, nombre, apellido } = req.body;
  
      if (!dni || !/^\d{7,8}$/.test(dni)) {
        return res.status(400).json({ error: 'DNI inválido o faltante.' });
      }
  
      const persona = await PersonalSAU.findOne({ where: { dni, nombre, apellido } });
      if (!persona) {
        return res.status(404).json({ error: 'No se encontró coincidencia en la base del personal SAU.' });
      }
  
      if (!persona.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(persona.email)) {
        return res.status(400).json({ error: 'El email en la base es inválido o está vacío.' });
      }
  
      return res.status(200).json({ email: persona.email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno al verificar el DNI.' });
    }
  }  
};

module.exports = adminController;
