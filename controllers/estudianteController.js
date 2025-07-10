const bcrypt = require('bcrypt');
const { Estudiante, Sysacad } = require('../models/initModels')(require('../config/database'));

const estudianteController = {
  register: async (req, res) => {
    try {
      const { legajo, dni, email, contraseña, datosAdicionales } = req.body;

      // Verificar en base Sysacad
      const registroSysacad = await Sysacad.findOne({ where: { legajo, dni } });

      if (!registroSysacad) {
        return res.status(404).json({ error: 'No se encontró estudiante en Sysacad con esos datos.' });
      }

      // Verificar si ya existe como estudiante registrado
      const existe = await Estudiante.findOne({ where: { legajo } });
      if (existe) {
        return res.status(400).json({ error: 'Este estudiante ya está registrado.' });
      }

      // Simulación de verificación por email
      const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);
      console.log(`[SIMULACIÓN] Código de verificación enviado al correo: ${email} → Código: ${codigoVerificacion}`);

      // Acá esperarías confirmación real del usuario. Por ahora lo omitimos.

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Crear el estudiante con datos de Sysacad + adicionales
      const nuevoEstudiante = await Estudiante.create({
        dni,
        legajo,
        email,
        nombre: registroSysacad.nombre,
        apellido: registroSysacad.apellido,
        carrera: registroSysacad.carrera,
        año_cursado: registroSysacad.año_cursado,
        promedio: registroSysacad.promedio,
        contraseña: hashedPassword,
        habilidades_blandas: datosAdicionales?.habilidades_blandas || [],
        habilidades_tecnicas: datosAdicionales?.habilidades_tecnicas || [],
        idiomas: datosAdicionales?.idiomas || [],
        disponibilidad_horaria: datosAdicionales?.disponibilidad_horaria,
        experiencia_previa: datosAdicionales?.experiencia_previa
      });

      res.status(201).json({ mensaje: 'Estudiante registrado con éxito.', estudiante: nuevoEstudiante });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno al registrar estudiante.' });
    }
  }
};

module.exports = estudianteController;
