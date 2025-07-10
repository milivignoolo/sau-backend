const bcrypt = require('bcrypt');
const { Estudiante, Sysacad } = require('../models/initModels')(require('../config/database'));

// Memoria temporal de códigos de verificación
const codigosVerificacion = new Map(); // email → { codigo, expiracion, intentos }

const estudianteController = {
  verificarIdentidad: async (req, res) => {
    try {
      const { legajo, dni } = req.body;

      const registroSysacad = await Sysacad.findOne({ where: { legajo, dni } });
      if (!registroSysacad) return res.status(404).json({ error: 'No se encontró en Sysacad' });

      const yaRegistrado = await Estudiante.findOne({ where: { legajo } });
      if (yaRegistrado) return res.status(400).json({ error: 'El estudiante ya está registrado' });

      res.json(registroSysacad);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar identidad' });
    }
  },

  enviarCodigo: async (req, res) => {
    try {
      const { email } = req.body;
      const codigo = Math.floor(100000 + Math.random() * 900000);
      const expiracion = Date.now() + 5 * 60 * 1000; // 5 minutos
      codigosVerificacion.set(email, { codigo, expiracion, intentos: 3 });

      console.log(`[SIMULACIÓN] Código enviado a ${email}: ${codigo}`);
      res.json({ mensaje: 'Código enviado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar código' });
    }
  },

  validarCodigo: async (req, res) => {
    try {
      const { email, codigo } = req.body;
      const registro = codigosVerificacion.get(email);

      if (!registro) return res.status(400).json({ error: 'No se ha enviado código a ese email' });
      if (Date.now() > registro.expiracion) {
        codigosVerificacion.delete(email);
        return res.status(400).json({ error: 'Código expirado' });
      }

      if (registro.intentos <= 0) {
        codigosVerificacion.delete(email);
        return res.status(400).json({ error: 'Se superó el número máximo de intentos' });
      }

      if (Number(codigo) !== registro.codigo) {
        registro.intentos--;
        return res.status(400).json({ error: 'Código incorrecto. Intentos restantes: ' + registro.intentos });
      }

      codigosVerificacion.delete(email);
      res.json({ mensaje: 'Código validado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al validar código' });
    }
  },

  register: async (req, res) => {
    try {
      const {
        legajo,
        dni,
        email,
        contraseña,
        habilidades_tecnicas,
        habilidades_blandas,
        idiomas,
        disponibilidad_horaria,
        experiencia_previa
      } = req.body;

      const sysacad = await Sysacad.findOne({ where: { legajo, dni } });
      if (!sysacad) return res.status(404).json({ error: 'Datos de Sysacad inválidos' });

      const existe = await Estudiante.findOne({ where: { legajo } });
      if (existe) return res.status(400).json({ error: 'El estudiante ya está registrado' });

      const hashedPassword = await bcrypt.hash(contraseña, 10);

      const nuevoEstudiante = await Estudiante.create({
        legajo,
        dni,
        email,
        contraseña: hashedPassword,
        nombre: sysacad.nombre,
        apellido: sysacad.apellido,
        carrera: sysacad.carrera,
        año_cursado: sysacad.año_cursado,
        promedio: sysacad.promedio,
        habilidades_blandas: habilidades_blandas || [],
        habilidades_tecnicas: habilidades_tecnicas || [],
        idiomas: idiomas || [],
        disponibilidad_horaria,
        experiencia_previa
      });

      res.status(201).json({ mensaje: 'Estudiante registrado con éxito', estudiante: nuevoEstudiante });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar estudiante' });
    }
  }
};

module.exports = estudianteController;