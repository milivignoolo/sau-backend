const bcrypt = require('bcrypt');
const { Estudiante, Empresa, Administrador } = require('../models/initModels')(require('../config/database'));

const authController = {
  login: async (req, res) => {
    try {
      const { email, contraseña } = req.body;

      let usuario = null;
      let rol = null;

      // 1. Buscar en estudiantes
      usuario = await Estudiante.findOne({ where: { email } });
      if (usuario) rol = 'estudiante';

      // 2. Si no está, buscar en empresas
      if (!usuario) {
        usuario = await Empresa.findOne({ where: { email } });
        if (usuario) rol = 'empresa';
      }

      // 3. Si tampoco está, buscar en administradores
      if (!usuario) {
        usuario = await Administrador.findOne({ where: { email } });
        if (usuario) rol = 'administrador';
      }

      // 4. Si no se encuentra el usuario
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado con ese email.' });
      }

      // 5. Comparar contraseñas
      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!contraseñaValida) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }

      // 6. Devolver respuesta con datos básicos
      let datos = {
        rol,
        email: usuario.email,
      };

      if (rol === 'estudiante') {
        datos.nombre = usuario.nombre;
        datos.apellido = usuario.apellido;
        datos.legajo = usuario.legajo;
      } else if (rol === 'empresa') {
        datos.razon_social = usuario.razon_social || usuario.nombre;
        datos.estado = usuario.estado;
      } else if (rol === 'administrador') {
        datos.nombre = usuario.nombre;
        datos.apellido = usuario.apellido;
      }

      res.status(200).json({
        mensaje: 'Login exitoso.',
        usuario: datos
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno en login.' });
    }
  }
};

module.exports = authController;
